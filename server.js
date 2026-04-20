const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL, pathToFileURL } = require("url");

const PORT = Number(process.env.PORT || process.env.SIGNAL_SCOUT_PORT || 4173);
const HOST = process.env.HOST || (process.env.PORT ? "0.0.0.0" : "127.0.0.1");
const ROOT_DIR = __dirname;
const MAX_BODY_BYTES = 50 * 1024 * 1024;
const OPENAI_API_BASE_URL = process.env.OPENAI_API_BASE_URL || "https://api.openai.com/v1";
const DEFAULT_OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";

const JSZIP_PATH = "C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/jszip";
const PDFJS_PATH = "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pdfjs-dist/legacy/build/pdf.mjs";

const JSZip = requireDependency("jszip", JSZIP_PATH);
const LOCAL_PDFJS_PATH = resolveLocalPdfJsPath();
let pdfjsPromise = null;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);

    if (req.method === "GET" && url.pathname === "/api/health") {
      return writeJson(res, 200, {
        ok: true,
        docSupport: ["txt", "md", "doc", "docx", "pdf"],
        defaultLlmConfigured: Boolean(process.env.OPENAI_API_KEY),
        recommendedModel: DEFAULT_OPENAI_MODEL,
        note: "Legacy .doc extraction is best-effort without Microsoft Word automation."
      });
    }

    if (req.method === "POST" && url.pathname === "/api/extract-resume") {
      return handleExtractResume(req, res);
    }

    if (req.method === "POST" && url.pathname === "/api/llm-tailor") {
      return handleLlmTailor(req, res);
    }

    if (req.method === "GET") {
      return serveStatic(url.pathname, res);
    }

    writeJson(res, 405, { error: "Method not allowed." });
  } catch (error) {
    console.error(error);
    writeJson(res, 500, { error: "Unexpected server error.", details: error.message });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Signal Scout server running at http://${HOST}:${PORT}`);
});

async function handleExtractResume(req, res) {
  try {
    const body = await readJsonBody(req);
    const filename = String(body.filename || "").trim();
    const extension = path.extname(filename).toLowerCase();
    const encoded = body.data;

    if (!filename || !encoded) {
      return writeJson(res, 400, { error: "Both filename and base64 file data are required." });
    }

    const buffer = Buffer.from(encoded, "base64");
    if (!buffer.length) {
      return writeJson(res, 400, { error: "The uploaded file could not be decoded." });
    }

    let extractedText = "";

    if ([".txt", ".md", ".text"].includes(extension)) {
      extractedText = normalizeWhitespace(buffer.toString("utf8"));
    } else if (extension === ".pdf") {
      extractedText = await extractPdfText(buffer);
    } else if (extension === ".docx") {
      extractedText = await extractDocxText(buffer);
    } else if (extension === ".doc") {
      extractedText = await extractDocText(buffer);
    } else {
      return writeJson(res, 415, { error: `Unsupported file type: ${extension || "unknown"}.` });
    }

    if (!extractedText) {
      return writeJson(res, 422, {
        error: "The file was uploaded, but the parser could not extract usable text.",
        details: buildEmptyTextGuidance(extension)
      });
    }

    writeJson(res, 200, {
      text: extractedText,
      extension,
      charCount: extractedText.length,
      note: extension === ".doc"
        ? "Legacy .doc extraction is best-effort. Review the imported text before matching jobs."
        : ""
    });
  } catch (error) {
    writeJson(res, 400, {
      error: error.message || "Failed to parse the uploaded file.",
      details: "If this keeps happening, try a plain-text paste or resave the file as .docx."
    });
  }
}

async function handleLlmTailor(req, res) {
  try {
    const body = await readJsonBody(req);
    const apiKey = String(body.apiKey || process.env.OPENAI_API_KEY || "").trim();
    const model = String(body.model || DEFAULT_OPENAI_MODEL).trim();
    const resumeText = String(body.resumeText || "").trim();
    const analysis = body.analysis || {};
    const job = body.job || {};
    const fallbackDraft = body.fallbackDraft || {};

    if (!apiKey) {
      return writeJson(res, 400, {
        error: "No OpenAI API key was provided.",
        details: "Paste a key into the UI for this session or configure OPENAI_API_KEY on the server."
      });
    }

    if (!resumeText || !job.title || !job.description) {
      return writeJson(res, 400, {
        error: "The LLM request is missing required resume or job data."
      });
    }

    const resumeDraft = await requestOpenAiResumeDraft({
      apiKey,
      model,
      resumeText,
      analysis,
      job,
      fallbackDraft
    });

    writeJson(res, 200, {
      modelUsed: model,
      resumeDraft
    });
  } catch (error) {
    const details = error?.details || "";
    writeJson(res, 502, {
      error: error.message || "The OpenAI request failed.",
      details
    });
  }
}

function serveStatic(requestPath, res) {
  const safePath = requestPath === "/" ? "/index.html" : requestPath;
  const resolvedPath = path.normalize(path.join(ROOT_DIR, safePath));

  if (!resolvedPath.startsWith(ROOT_DIR)) {
    return writeJson(res, 403, { error: "Forbidden path." });
  }

  fs.readFile(resolvedPath, (error, data) => {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found.");
        return;
      }
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Failed to read file.");
      return;
    }

    const contentType = MIME_TYPES[path.extname(resolvedPath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    let bytes = 0;

    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      bytes += Buffer.byteLength(chunk);
      if (bytes > MAX_BODY_BYTES) {
        reject(new Error("Request body exceeded the size limit."));
        req.destroy();
        return;
      }
      raw += chunk;
    });

    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(new Error("Invalid JSON request body."));
      }
    });

    req.on("error", reject);
  });
}

async function extractPdfText(buffer) {
  if (!pdfjsPromise) {
    pdfjsPromise = import(LOCAL_PDFJS_PATH || PDFJS_PATH);
  }

  const pdfjs = await pdfjsPromise;
  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(buffer) });
  const pdf = await loadingTask.promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const chunks = textContent.items
      .map((item) => item.str)
      .filter(Boolean);
    pages.push(chunks.join(" "));
  }

  return normalizeWhitespace(pages.join("\n\n"));
}

function buildEmptyTextGuidance(extension) {
  if (extension === ".pdf") {
    return "This PDF may be image-only, scanned, or protected. Try uploading a .docx version, export a text-selectable PDF, or paste the resume text directly.";
  }

  if (extension === ".doc") {
    return "Legacy .doc support is best-effort. Try saving the file as .docx or PDF and uploading that instead.";
  }

  if (extension === ".docx") {
    return "This .docx file appears to contain little or no extractable body text. Try re-saving it in Word/Google Docs and uploading it again.";
  }

  return "Try a different file or verify the document contains selectable text.";
}

async function extractDocxText(buffer) {
  const zip = await JSZip.loadAsync(buffer);
  const candidates = Object.keys(zip.files)
    .filter((name) => /^word\/(document|header\d+|footer\d+)\.xml$/i.test(name))
    .sort((left, right) => {
      if (left.includes("document.xml")) {
        return -1;
      }
      if (right.includes("document.xml")) {
        return 1;
      }
      return left.localeCompare(right);
    });

  const parts = [];
  for (const name of candidates) {
    const xml = await zip.files[name].async("string");
    const text = extractWordXmlText(xml);
    if (text) {
      parts.push(text);
    }
  }

  return normalizeWhitespace(parts.join("\n\n"));
}

async function extractDocText(buffer) {
  if (looksLikeRtf(buffer)) {
    return normalizeWhitespace(extractRtfText(buffer.toString("latin1")));
  }

  const utf16Runs = collectPrintableRuns(buffer.toString("utf16le"));
  const latinRuns = collectPrintableRuns(buffer.toString("latin1"));
  const combined = normalizeWhitespace([...utf16Runs, ...latinRuns].join("\n"));

  if (combined) {
    return combined;
  }

  return "";
}

async function requestOpenAiResumeDraft({ apiKey, model, resumeText, analysis, job, fallbackDraft }) {
  const prompt = buildTailoringPrompt({ resumeText, analysis, job, fallbackDraft });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  try {
    const response = await fetch(`${OPENAI_API_BASE_URL}/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        reasoning: { effort: "low" },
        instructions: [
          "You tailor resumes for job applications.",
          "Return JSON only.",
          "Use only facts that appear in the provided resume.",
          "Do not invent employers, dates, degrees, technologies, scope, metrics, or achievements.",
          "You may reword, reorder, and emphasize experience when it is already supported by the resume."
        ].join(" "),
        input: prompt,
        text: {
          format: {
            type: "json_object"
          }
        }
      }),
      signal: controller.signal
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data.error?.message || data.error || "The OpenAI API returned an error.";
      const error = new Error(message);
      error.details = data.error?.type ? `API type: ${data.error.type}` : "";
      throw error;
    }

    const outputText = extractResponseText(data);
    if (!outputText) {
      throw new Error("The OpenAI response did not contain any text output.");
    }

    const parsed = JSON.parse(outputText);
    return validateResumeDraft(parsed);
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("The OpenAI request timed out. Try a smaller resume, a faster model, or rerun the request.");
    }
    if (error instanceof SyntaxError) {
      throw new Error("The OpenAI response was not valid JSON.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function buildTailoringPrompt({ resumeText, analysis, job, fallbackDraft }) {
  const snapshot = {
    candidate_name: analysis.name || "Candidate",
    source_summary: analysis.summaryText || "",
    primary_title: analysis.primaryTitle || "",
    role_titles: analysis.roleTitles || [],
    skills: analysis.skills || [],
    metrics: analysis.metrics || [],
    experience_entries: analysis.experienceEntries || [],
    fallback_resume_summary: fallbackDraft.summary || "",
    fallback_alignment_notes: fallbackDraft.fitNotes || []
  };

  return [
    "Create a tailored resume draft for the target role.",
    "Return a JSON object with these keys exactly:",
    "{",
    '  "source_title": string,',
    '  "targeted_summary": string,',
    '  "relevant_skills": string[],',
    '  "tailored_experience": [{"role": string, "company": string, "dates": string, "bullets": string[]}],',
    '  "alignment_notes": string[],',
    '  "review_flags": string[]',
    "}",
    "",
    "Rules:",
    "- Keep summaries concise and specific to the target job.",
    "- Tailor bullets by emphasizing overlap with the job description, but keep every claim factual.",
    "- Preserve metrics and named tools if they appear in the resume.",
    "- Do not add a skill unless the resume supports it.",
    "- Mention gaps or items that still need human review in review_flags.",
    "",
    "Resume text:",
    resumeText,
    "",
    "Parsed resume snapshot:",
    JSON.stringify(snapshot, null, 2),
    "",
    "Target job:",
    JSON.stringify({
      title: job.title,
      company: job.company,
      location: job.location,
      summary: job.summary,
      description: job.description,
      keywords: job.keywords,
      requirements: job.requirements,
      responsibilities: job.responsibilities
    }, null, 2),
    "",
    "Reminder: return JSON only."
  ].join("\n");
}

function extractResponseText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const textChunks = [];
  (data.output || []).forEach((item) => {
    if (!Array.isArray(item.content)) {
      return;
    }
    item.content.forEach((contentItem) => {
      if (typeof contentItem.text === "string" && /text/i.test(contentItem.type || "")) {
        textChunks.push(contentItem.text);
      }
    });
  });

  return textChunks.join("").trim();
}

function validateResumeDraft(parsed) {
  return {
    source_title: String(parsed.source_title || "").trim(),
    targeted_summary: String(parsed.targeted_summary || "").trim(),
    relevant_skills: Array.isArray(parsed.relevant_skills) ? parsed.relevant_skills.map((value) => String(value).trim()).filter(Boolean) : [],
    tailored_experience: Array.isArray(parsed.tailored_experience)
      ? parsed.tailored_experience.map((entry) => ({
        role: String(entry.role || "").trim(),
        company: String(entry.company || "").trim(),
        dates: String(entry.dates || "").trim(),
        bullets: Array.isArray(entry.bullets) ? entry.bullets.map((bullet) => String(bullet).trim()).filter(Boolean) : []
      })).filter((entry) => entry.bullets.length)
      : [],
    alignment_notes: Array.isArray(parsed.alignment_notes) ? parsed.alignment_notes.map((value) => String(value).trim()).filter(Boolean) : [],
    review_flags: Array.isArray(parsed.review_flags) ? parsed.review_flags.map((value) => String(value).trim()).filter(Boolean) : []
  };
}

function extractWordXmlText(xml) {
  return decodeEntities(
    xml
      .replace(/<w:tab\/>/g, "\t")
      .replace(/<w:br\/>/g, "\n")
      .replace(/<\/w:p>/g, "\n")
      .replace(/<[^>]+>/g, "")
  );
}

function looksLikeRtf(buffer) {
  return buffer.slice(0, 8).toString("latin1").toLowerCase().includes("{\\rtf");
}

function extractRtfText(rtf) {
  return rtf
    .replace(/\\par[d]?/g, "\n")
    .replace(/\\tab/g, "\t")
    .replace(/\\'[0-9a-fA-F]{2}/g, (match) => String.fromCharCode(parseInt(match.slice(2), 16)))
    .replace(/\\u(-?\d+)\??/g, (_, code) => {
      const parsed = Number(code);
      return Number.isNaN(parsed) ? "" : String.fromCharCode(parsed < 0 ? parsed + 65536 : parsed);
    })
    .replace(/\\[a-zA-Z]+\d* ?/g, "")
    .replace(/[{}]/g, "");
}

function collectPrintableRuns(text) {
  return uniqueLines(
    text
      .replace(/\u0000/g, "")
      .split(/[\r\n]+/)
      .map((line) => line.replace(/[^\x20-\x7E\t]/g, " ").trim())
      .filter((line) => line.length >= 4)
  );
}

function uniqueLines(lines) {
  return [...new Set(lines)];
}

function normalizeWhitespace(text) {
  return String(text || "")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));
}

function requireDependency(packageName, fallbackPath) {
  try {
    return require(packageName);
  } catch (error) {
    return require(fallbackPath);
  }
}

function resolveLocalPdfJsPath() {
  try {
    return pathToFileURL(require.resolve("pdfjs-dist/legacy/build/pdf.mjs")).href;
  } catch (error) {
    return "";
  }
}

function writeJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}
