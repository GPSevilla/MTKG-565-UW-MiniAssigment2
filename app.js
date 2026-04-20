const STORAGE_KEY = "signal-scout-prototype-v1";
const LOCAL_SERVER_ORIGIN = "http://127.0.0.1:4173";

const SAMPLE_RESUME = `Jordan Lee
Seattle, WA | jordan.lee@email.com | linkedin.com/in/jordan-lee

SUMMARY
Operations and product-minded analyst with experience building workflow automation, dashboarding, and AI-assisted tooling for recruiting and customer support teams.

EXPERIENCE
Senior Operations Analyst | Cascade Talent Systems | 2023-Present
- Built Python and SQL workflows that cut recruiter reporting time by 38% and improved funnel visibility across 120+ open roles.
- Partnered with product and recruiting leaders to redesign intake and handoff processes, reducing time-to-review by 26%.
- Shipped an internal resume-screening assistant using retrieval plus prompt templates to surface candidate signals for recruiters.
- Created Tableau dashboards for hiring pipeline health, source quality, and recruiter capacity planning.

Program Analyst | Northwind Health | 2021-2023
- Automated recurring operational tasks with Python, APIs, and spreadsheet tooling, saving roughly 12 hours per week.
- Coordinated cross-functional launches with operations, customer success, and engineering teams for workflow improvements.
- Wrote requirements, tested releases, and documented SOPs for a scheduling and support platform used by 3 regional teams.

Business Operations Intern | Harbor Labs | 2020-2021
- Consolidated product usage data in SQL and presented weekly findings to leadership.
- Supported customer onboarding playbooks and tracked churn-risk indicators in dashboards.

SKILLS
Python, SQL, Tableau, APIs, Prompt Design, Workflow Automation, Stakeholder Communication, Experimentation, SOP Design, Requirements Gathering, Data Analysis`;

const BASE_JOBS = [
  {
    id: "nimbus-ai-ops",
    title: "AI Operations Analyst",
    company: "Nimbus Talent",
    location: "Remote (US)",
    mode: "Remote",
    platform: "Greenhouse",
    summary: "Own workflow improvements, analyst tooling, and AI-assisted recruiter operations for a high-volume hiring team.",
    description: "Nimbus Talent is hiring an AI Operations Analyst to support recruiter productivity, build workflow automation, partner with product managers, and analyze funnel health across a rapidly growing hiring organization.",
    keywords: [
      "python",
      "sql",
      "workflow automation",
      "prompt design",
      "analytics",
      "recruiting",
      "stakeholder communication",
      "dashboards",
      "experimentation"
    ],
    requirements: [
      "2+ years in analytics, operations, or recruiting operations",
      "Comfort with SQL, dashboards, and process improvement",
      "Experience using AI or automation tooling in internal workflows"
    ],
    responsibilities: [
      "Own recruiter workflow metrics",
      "Prototype AI-assisted tooling",
      "Partner with cross-functional stakeholders"
    ]
  },
  {
    id: "northbeam-solutions",
    title: "Solutions Engineer, Workflow Automation",
    company: "Northbeam Labs",
    location: "Seattle, WA",
    mode: "Hybrid",
    platform: "Lever",
    summary: "Help customers launch workflow automations, connect APIs, and design repeatable technical solutions.",
    description: "Northbeam Labs is looking for a solutions engineer who can pair technical implementation with consultative problem solving across automation, APIs, and customer-facing delivery.",
    keywords: [
      "python",
      "apis",
      "workflow automation",
      "customer onboarding",
      "technical documentation",
      "stakeholder communication",
      "process improvement",
      "experimentation"
    ],
    requirements: [
      "Experience implementing API-backed workflows",
      "Strong written communication and stakeholder management",
      "Ability to translate ambiguous customer needs into scoped technical solutions"
    ],
    responsibilities: [
      "Design integration flows",
      "Lead technical discovery",
      "Document repeatable playbooks"
    ]
  },
  {
    id: "brightloop-product",
    title: "Product Analyst, Hiring Intelligence",
    company: "BrightLoop",
    location: "San Francisco, CA",
    mode: "Hybrid",
    platform: "Ashby",
    summary: "Support the product team with analytics, experiment design, recruiter research, and tooling insights.",
    description: "BrightLoop builds AI products for talent teams and needs a product analyst who can move from SQL to experiments to stakeholder synthesis with minimal hand-holding.",
    keywords: [
      "product analytics",
      "sql",
      "experimentation",
      "recruiting",
      "dashboards",
      "requirements gathering",
      "stakeholder communication",
      "ai"
    ],
    requirements: [
      "Experience with product metrics and experimentation",
      "Comfort partnering with PMs and operators",
      "Ability to turn qualitative pain points into measurable hypotheses"
    ],
    responsibilities: [
      "Analyze usage trends",
      "Shape experiment plans",
      "Translate recruiter pain points into product insights"
    ]
  },
  {
    id: "atlas-program",
    title: "Program Analyst, Operational Excellence",
    company: "Atlas Mobility",
    location: "Seattle, WA",
    mode: "Onsite",
    platform: "Company Site",
    summary: "Improve operational efficiency through reporting, process redesign, and cross-functional program support.",
    description: "Atlas Mobility wants a program analyst who can own recurring reporting, surface bottlenecks, and coordinate process improvement efforts across operations, support, and engineering.",
    keywords: [
      "sql",
      "dashboards",
      "process improvement",
      "stakeholder communication",
      "operations",
      "requirements gathering",
      "documentation",
      "analytics"
    ],
    requirements: [
      "Strong reporting and process improvement background",
      "Comfort with cross-functional coordination",
      "Experience maintaining dashboards and program documentation"
    ],
    responsibilities: [
      "Run weekly reporting",
      "Coordinate stakeholders",
      "Maintain playbooks and process documentation"
    ]
  }
];

const SKILL_LIBRARY = [
  "python",
  "sql",
  "javascript",
  "typescript",
  "react",
  "node",
  "apis",
  "api",
  "workflow automation",
  "automation",
  "prompt design",
  "prompt engineering",
  "llm",
  "ai",
  "analytics",
  "product analytics",
  "data analysis",
  "dashboards",
  "tableau",
  "power bi",
  "requirements gathering",
  "stakeholder communication",
  "customer onboarding",
  "process improvement",
  "recruiting",
  "operations",
  "documentation",
  "experimentation",
  "sop design",
  "project management"
];

const TITLE_LIBRARY = [
  "analyst",
  "engineer",
  "manager",
  "consultant",
  "specialist",
  "operations",
  "program",
  "product"
];

const STOPWORDS = new Set([
  "about",
  "after",
  "across",
  "also",
  "and",
  "been",
  "build",
  "built",
  "candidate",
  "company",
  "design",
  "experience",
  "for",
  "from",
  "have",
  "help",
  "into",
  "more",
  "with",
  "that",
  "this",
  "their",
  "your",
  "will",
  "were",
  "using",
  "used",
  "teams",
  "team",
  "roles",
  "role",
  "through",
  "support",
  "strong",
  "accomplished",
  "responsible",
  "lead",
  "work",
  "working"
]);

const RESUME_SECTION_ALIASES = {
  summary: [
    "summary",
    "professional summary",
    "profile",
    "professional profile",
    "objective"
  ],
  experience: [
    "experience",
    "work experience",
    "professional experience",
    "employment",
    "employment history"
  ],
  skills: [
    "skills",
    "technical skills",
    "core skills",
    "competencies"
  ],
  education: [
    "education",
    "academic background"
  ],
  projects: [
    "projects",
    "selected projects"
  ]
};

const ROLE_TOKEN_STOPWORDS = new Set([
  "senior",
  "junior",
  "associate",
  "intern",
  "current",
  "present",
  "lead",
  "principal",
  "staff"
]);

const TAILOR_LABELS = {
  "workflow automation": "Workflow automation",
  "stakeholder communication": "Cross-functional communication",
  "process improvement": "Process improvement",
  "dashboards": "Dashboards and reporting",
  "analytics": "Analytics",
  "product analytics": "Product analytics",
  "recruiting": "Recruiting operations",
  "customer onboarding": "Customer onboarding",
  "requirements gathering": "Requirements gathering",
  "documentation": "Documentation",
  "experimentation": "Experimentation",
  "prompt design": "AI workflow design",
  "operations": "Operations execution",
  "apis": "API-enabled workflows"
};

const refs = {};
let state = createInitialState();
const runtimeState = {
  apiKey: "",
  serverHealth: null
};

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  cacheDom();
  bindEvents();
  hydrateInputs();
  renderAll();
  checkParserHealth();
});

function createInitialState() {
  return {
    resumeText: "",
    preferences: {
      targetRoles: "",
      preferredLocation: "",
      remoteOnly: false
    },
    llm: {
      enabled: false,
      model: "gpt-5.4-mini"
    },
    customJobs: [],
    analysis: null,
    matches: [],
    selectedJobId: null,
    tailoredResume: null,
    applicationPacket: null,
    applicationReview: {},
    logs: []
  };
}

function cacheDom() {
  refs.resumeInput = document.getElementById("resume-input");
  refs.resumeFile = document.getElementById("resume-file");
  refs.parserStatus = document.getElementById("parser-status");
  refs.useLlm = document.getElementById("use-llm");
  refs.apiKeyInput = document.getElementById("api-key-input");
  refs.llmModel = document.getElementById("llm-model");
  refs.llmStatus = document.getElementById("llm-status");
  refs.targetRoles = document.getElementById("target-roles");
  refs.preferredLocation = document.getElementById("preferred-location");
  refs.remoteOnly = document.getElementById("remote-only");
  refs.customTitle = document.getElementById("custom-title");
  refs.customCompany = document.getElementById("custom-company");
  refs.customLocation = document.getElementById("custom-location");
  refs.customDescription = document.getElementById("custom-description");
  refs.matchSummary = document.getElementById("match-summary");
  refs.matches = document.getElementById("matches");
  refs.agentLog = document.getElementById("agent-log");
  refs.resumeOutput = document.getElementById("resume-output");
  refs.applicationOutput = document.getElementById("application-output");
}

function bindEvents() {
  document.getElementById("load-sample").addEventListener("click", loadSampleResume);
  document.getElementById("run-agent").addEventListener("click", runAgent);
  document.getElementById("reset-demo").addEventListener("click", resetDemo);
  document.getElementById("add-custom-job").addEventListener("click", addCustomJob);
  document.getElementById("clear-log").addEventListener("click", clearLog);
  document.getElementById("copy-resume").addEventListener("click", copyResumeDraft);
  document.getElementById("simulate-submit").addEventListener("click", simulateSubmit);
  refs.resumeFile.addEventListener("change", handleFileUpload);
  refs.apiKeyInput.addEventListener("input", () => {
    runtimeState.apiKey = refs.apiKeyInput.value.trim();
    checkParserHealth();
  });
  refs.matches.addEventListener("click", handleMatchActions);
  refs.applicationOutput.addEventListener("change", handleReviewToggle);

  [
    refs.resumeInput,
    refs.targetRoles,
    refs.preferredLocation,
    refs.remoteOnly,
    refs.useLlm,
    refs.llmModel,
    refs.customTitle,
    refs.customCompany,
    refs.customLocation,
    refs.customDescription
  ].forEach((element) => {
    element.addEventListener("input", persistDraftFields);
    if (element.type === "checkbox") {
      element.addEventListener("change", persistDraftFields);
    }
  });
}

function hydrateInputs() {
  refs.resumeInput.value = state.resumeText;
  refs.targetRoles.value = state.preferences.targetRoles;
  refs.preferredLocation.value = state.preferences.preferredLocation;
  refs.remoteOnly.checked = state.preferences.remoteOnly;
  refs.useLlm.checked = state.llm.enabled;
  refs.llmModel.value = state.llm.model;
}

function persistDraftFields() {
  syncStateFromInputs();
  refreshLlmStatus();
  saveState();
}

function syncStateFromInputs() {
  state.resumeText = refs.resumeInput.value.trim();
  state.preferences.targetRoles = refs.targetRoles.value.trim();
  state.preferences.preferredLocation = refs.preferredLocation.value.trim();
  state.preferences.remoteOnly = refs.remoteOnly.checked;
  state.llm.enabled = refs.useLlm.checked;
  state.llm.model = refs.llmModel.value;
}

function loadSampleResume() {
  refs.resumeInput.value = SAMPLE_RESUME;
  refs.targetRoles.value = "AI operations analyst, product analyst, solutions engineer";
  refs.preferredLocation.value = "Seattle or Remote";
  refs.remoteOnly.checked = false;
  syncStateFromInputs();
  addLog("intake", "Loaded the sample resume and default job preferences so the workflow is immediately testable.");
  saveState();
  renderAll();
}

async function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  try {
    const extension = getFileExtension(file.name);
    const textExtensions = new Set(["txt", "md", "text"]);

    if (textExtensions.has(extension)) {
      const text = await file.text();
      refs.resumeInput.value = text;
      syncStateFromInputs();
      addLog("intake", `Imported resume text from ${file.name}.`);
      saveState();
      renderAll();
      return;
    }

    if (!["doc", "docx", "pdf"].includes(extension)) {
      addLog("guardrail", `Unsupported upload type for ${file.name}. Use .txt, .md, .doc, .docx, or .pdf.`);
      renderLogs();
      return;
    }

    updateParserStatus("Parsing the uploaded document through the local extractor...", "pending");
    addLog("intake", `Uploading ${file.name} for document text extraction.`);
    renderLogs();

    const extracted = await extractTextViaServer(file);
    refs.resumeInput.value = extracted.text;
    syncStateFromInputs();
    addLog(
      "intake",
      extracted.note
        ? `Imported text from ${file.name}. ${extracted.note}`
        : `Imported ${extracted.charCount} characters from ${file.name}.`
    );
    updateParserStatus("Local document parser is online and ready for .doc, .docx, and .pdf uploads.", "ready");
    saveState();
    renderAll();
  } catch (error) {
    const message = error instanceof Error ? error.message : "The document could not be parsed.";
    addLog("guardrail", message);
    updateParserStatus("The document parser could not process that upload. See the agent log for details.", "error");
    renderLogs();
  } finally {
    resetFileInput();
  }
}

function addCustomJob() {
  const title = refs.customTitle.value.trim();
  const company = refs.customCompany.value.trim();
  const location = refs.customLocation.value.trim();
  const description = refs.customDescription.value.trim();

  if (!title || !description) {
    addLog("guardrail", "A custom job needs at least a role title and job description before it can be scored.");
    renderLogs();
    return;
  }

  const customJob = buildCustomJob({
    title,
    company: company || "Custom Company",
    location: location || "Flexible",
    description
  });

  state.customJobs = [customJob, ...state.customJobs];
  refs.customTitle.value = "";
  refs.customCompany.value = "";
  refs.customLocation.value = "";
  refs.customDescription.value = "";

  addLog("search", `Added ${customJob.title} at ${customJob.company} to the local queue so the matcher can compare it against the resume.`);
  saveState();
  renderAll();
}

async function runAgent() {
  syncStateFromInputs();

  if (state.llm.enabled) {
    await checkParserHealth();
  }

  if (!state.resumeText || state.resumeText.length < 80) {
    addLog("guardrail", "The resume input is too short to tailor reliably. Paste a fuller resume or load the sample first.");
    renderLogs();
    return;
  }

  const analysis = analyzeResume(state.resumeText);
  state.analysis = analysis;
  addLog(
    "plan",
    `Parsed the resume into ${analysis.skills.length} skill signals, ${analysis.bullets.length} experience bullets, and ${analysis.metrics.length} measurable outcomes.`
  );

  const matches = scoreJobs(analysis, getAllJobs(), state.preferences);
  state.matches = matches;

  if (!matches.length) {
    state.selectedJobId = null;
    state.tailoredResume = null;
    state.applicationPacket = null;
    addLog("search", "No jobs cleared the matcher. Try broadening the role or location preferences.");
    saveState();
    renderAll();
    return;
  }

  const topMatch = matches[0];
  state.selectedJobId = topMatch.id;
  addLog(
    "match",
    `Ranked ${matches.length} jobs and selected ${topMatch.title} at ${topMatch.company} as the current best fit with a score of ${topMatch.score}.`
  );

  await generateOutputsForSelectedJob();
  saveState();
  renderAll();
}

function resetDemo() {
  state = createInitialState();
  runtimeState.apiKey = "";
  saveState();
  hydrateInputs();
  if (refs.apiKeyInput) {
    refs.apiKeyInput.value = "";
  }
  refreshLlmStatus();
  renderAll();
}

function clearLog() {
  state.logs = [];
  saveState();
  renderLogs();
}

async function checkParserHealth() {
  if (!window.location.protocol.startsWith("http")) {
    updateParserStatus("Open the prototype through the local server to enable .doc, .docx, and .pdf uploads. Plain text paste still works.", "offline");
    updateLlmStatus("Open the prototype through the local server to enable live LLM tailoring.", "offline");
    return false;
  }

  try {
    const response = await fetch(`${getServerOrigin()}/api/health`);
    if (!response.ok) {
      throw new Error("Parser health check failed.");
    }
    runtimeState.serverHealth = await response.json();
    updateParserStatus("Local document parser is online and ready for .doc, .docx, and .pdf uploads.", "ready");
    refreshLlmStatus();
    return true;
  } catch (error) {
    runtimeState.serverHealth = null;
    updateParserStatus("Parser offline. Start the local server to use .doc, .docx, and .pdf uploads.", "offline");
    updateLlmStatus("LLM tailoring is offline because the local server is not reachable.", "offline");
    return false;
  }
}

async function extractTextViaServer(file) {
  const buffer = await file.arrayBuffer();
  let response;

  try {
    response = await fetch(`${getServerOrigin()}/api/extract-resume`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filename: file.name,
        mimeType: file.type,
        data: arrayBufferToBase64(buffer)
      })
    });
  } catch (error) {
    throw new Error("The local upload server is not reachable. Start `start-server.cmd`, keep that window open, reload http://127.0.0.1:4173, and try the upload again.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detailText = [data.error, data.details].filter(Boolean).join(" ");
    throw new Error(detailText || "The local parser rejected the uploaded file.");
  }

  return data;
}

async function requestLlmTailoring(job, fallbackDraft) {
  let response;

  try {
    response = await fetch(`${getServerOrigin()}/api/llm-tailor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: runtimeState.apiKey,
        model: state.llm.model,
        resumeText: state.resumeText,
        analysis: {
          name: state.analysis.name,
          summaryText: state.analysis.summaryText,
          primaryTitle: state.analysis.primaryTitle,
          roleTitles: state.analysis.roleTitles,
          skills: state.analysis.skills,
          metrics: state.analysis.metrics,
          experienceEntries: state.analysis.experienceEntries
        },
        job,
        fallbackDraft
      })
    });
  } catch (error) {
    throw new Error("The local server could not reach the OpenAI endpoint. Check your internet connection or deployed environment.");
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error([payload.error, payload.details].filter(Boolean).join(" ") || "The LLM tailoring request failed.");
  }

  return normalizeLlmResume(payload, fallbackDraft, state.analysis, job);
}

function normalizeLlmResume(payload, fallbackDraft, analysis, job) {
  const llmDraft = payload.resumeDraft || {};
  const selectedSkills = uniqueTerms((llmDraft.relevant_skills || []).filter(Boolean)).slice(0, 10);
  const tailoredEntries = (llmDraft.tailored_experience || [])
    .map((entry) => ({
      role: entry.role || "",
      company: entry.company || "",
      dates: entry.dates || "",
      bullets: Array.isArray(entry.bullets)
        ? entry.bullets.map((bullet) => sentenceCase(cleanBulletLine(String(bullet || "")))).filter(Boolean)
        : []
    }))
    .filter((entry) => entry.bullets.length);

  const fitNotes = Array.isArray(llmDraft.alignment_notes) && llmDraft.alignment_notes.length
    ? llmDraft.alignment_notes
    : fallbackDraft.fitNotes;
  const reviewFlags = Array.isArray(llmDraft.review_flags) && llmDraft.review_flags.length
    ? llmDraft.review_flags
    : fallbackDraft.reviewFlags;
  const summary = llmDraft.targeted_summary || fallbackDraft.summary;
  const sourceTitle = llmDraft.source_title || analysis.primaryTitle || fallbackDraft.sourceTitle;

  const plainText = [
    analysis.name,
    `${sourceTitle || "Candidate"} targeting ${job.title} | ${job.company}`,
    "",
    "TARGETED SUMMARY",
    summary,
    "",
    "RELEVANT SKILLS",
    (selectedSkills.length ? selectedSkills : fallbackDraft.selectedSkills).join(", "),
    "",
    "TAILORED EXPERIENCE",
    ...(tailoredEntries.length ? tailoredEntries : fallbackDraft.tailoredEntries).flatMap((entry) => {
      const heading = [entry.role, entry.company, entry.dates].filter(Boolean).join(" | ");
      return [heading, ...entry.bullets.map((bullet) => `- ${bullet}`), ""];
    }),
    "",
    "ALIGNMENT NOTES",
    ...fitNotes.map((note) => `- ${note}`),
    "",
    "REVIEW FLAGS",
    ...reviewFlags.map((flag) => `- ${flag}`)
  ].join("\n");

  return {
    ...fallbackDraft,
    summary,
    sourceTitle,
    selectedSkills: selectedSkills.length ? selectedSkills : fallbackDraft.selectedSkills,
    selectedBullets: (tailoredEntries.length ? tailoredEntries : fallbackDraft.tailoredEntries).flatMap((entry) => entry.bullets).slice(0, 6),
    tailoredEntries: tailoredEntries.length ? tailoredEntries : fallbackDraft.tailoredEntries,
    fitNotes,
    reviewFlags,
    plainText,
    generator: "llm",
    modelUsed: payload.modelUsed || state.llm.model
  };
}

function getServerOrigin() {
  if (window.location.origin && window.location.origin !== "null") {
    return window.location.origin;
  }
  return LOCAL_SERVER_ORIGIN;
}

function updateParserStatus(message, stateName) {
  if (!refs.parserStatus) {
    return;
  }
  refs.parserStatus.textContent = message;
  refs.parserStatus.dataset.state = stateName;
}

function updateLlmStatus(message, stateName) {
  if (!refs.llmStatus) {
    return;
  }
  refs.llmStatus.textContent = message;
  refs.llmStatus.dataset.state = stateName;
}

function refreshLlmStatus() {
  if (!refs.llmStatus) {
    return;
  }

  if (!runtimeState.serverHealth) {
    updateLlmStatus("LLM tailoring is offline because the local server is not reachable.", "offline");
    return;
  }

  if (runtimeState.serverHealth.defaultLlmConfigured) {
    updateLlmStatus(`LLM requests can use the server-side default model ${runtimeState.serverHealth.recommendedModel}.`, "ready");
    return;
  }

  if (runtimeState.apiKey) {
    updateLlmStatus(`API key loaded for this session. Drafts will use ${state.llm.model}.`, "ready");
    return;
  }

  updateLlmStatus("Add an OpenAI API key for this session, or deploy with OPENAI_API_KEY on the server.", "offline");
}

function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

function getFileExtension(filename) {
  const parts = String(filename || "").split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}

function resetFileInput() {
  if (refs.resumeFile) {
    refs.resumeFile.value = "";
  }
}

async function handleMatchActions(event) {
  const button = event.target.closest("[data-job-action]");
  if (!button) {
    return;
  }

  const jobId = button.dataset.jobId;
  const action = button.dataset.jobAction;
  state.selectedJobId = jobId;

  if (action === "inspect") {
    addLog("match", `Moved focus to ${getJobById(jobId).title} so the tailored resume and packet can update around that role.`);
    await generateOutputsForSelectedJob();
  }

  if (action === "tailor") {
    addLog("tailor", `Regenerating the tailored resume around ${getJobById(jobId).title}.`);
    await generateOutputsForSelectedJob();
  }

  if (action === "packet") {
    addLog("apply", `Preparing the application packet for ${getJobById(jobId).company} with the required review gate.`);
    await generateOutputsForSelectedJob();
  }

  saveState();
  renderAll();
}

function handleReviewToggle(event) {
  const checkbox = event.target.closest(".review-check");
  if (!checkbox) {
    return;
  }

  state.applicationReview[checkbox.dataset.checkId] = checkbox.checked;
  saveState();
}

async function generateOutputsForSelectedJob() {
  const selectedJob = getJobById(state.selectedJobId);
  if (!selectedJob || !state.analysis) {
    return;
  }

  state.applicationReview = {};
  let tailoredResume = buildTailoredResume(state.analysis, selectedJob);

  if (state.llm.enabled) {
    try {
      const hasCredential = Boolean(runtimeState.apiKey || runtimeState.serverHealth?.defaultLlmConfigured);
      if (!hasCredential) {
        throw new Error("LLM tailoring is enabled, but no API key is available. Add one in the UI or configure OPENAI_API_KEY on the server.");
      }

      updateLlmStatus(`Generating an LLM-tailored draft with ${state.llm.model}...`, "pending");
      addLog("tailor", `Calling ${state.llm.model} to rewrite the selected resume draft for ${selectedJob.title}.`);
      tailoredResume = await requestLlmTailoring(selectedJob, tailoredResume);
      updateLlmStatus(`LLM tailoring active with ${tailoredResume.modelUsed || state.llm.model}.`, "ready");
    } catch (error) {
      const message = error instanceof Error ? error.message : "The LLM draft failed, so the prototype kept the local fallback.";
      addLog("guardrail", `${message} Falling back to the local drafting logic.`);
      updateLlmStatus("The LLM request failed, so the prototype is showing the local fallback draft.", "error");
    }
  }

  state.tailoredResume = tailoredResume;
  state.applicationPacket = buildApplicationPacket(state.analysis, state.tailoredResume, selectedJob);

  addLog(
    "tailor",
    `${state.tailoredResume.generator === "llm" ? "Built an LLM-tailored draft" : "Built a truth-preserving local draft"} that emphasizes ${state.tailoredResume.selectedSkills.slice(0, 3).join(", ") || "the strongest uploaded resume evidence"} for ${selectedJob.company}.`
  );
  addLog(
    "apply",
    `Prepared a guarded application packet and marked the checks that still need a human before a final submit action.`
  );
}

function simulateSubmit() {
  if (!state.applicationPacket) {
    addLog("guardrail", "There is no application packet yet. Run the agent or choose a job first.");
    renderLogs();
    return;
  }

  const pendingChecks = state.applicationPacket.reviewChecklist.filter(
    (item) => !state.applicationReview[item.id]
  );

  if (pendingChecks.length) {
    addLog(
      "guardrail",
      `Submission blocked. The human review gate still needs ${pendingChecks.length} confirmation${pendingChecks.length > 1 ? "s" : ""}.`
    );
    renderLogs();
    return;
  }

  state.applicationPacket.status = "submitted";
  state.applicationPacket.submittedAt = formatLongTime(new Date());
  addLog(
    "apply",
    `Simulated submission completed for ${state.applicationPacket.title} at ${state.applicationPacket.company}. In a production system this is where browser automation would hand off to the employer site.`
  );
  saveState();
  renderApplication();
  renderLogs();
}

function copyResumeDraft() {
  if (!state.tailoredResume) {
    addLog("guardrail", "There is no tailored resume draft to copy yet.");
    renderLogs();
    return;
  }

  const payload = state.tailoredResume.plainText;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(payload).then(() => {
      addLog("tailor", "Copied the tailored resume draft to the clipboard.");
      renderLogs();
    }).catch(() => fallbackCopy(payload));
    return;
  }

  fallbackCopy(payload);
}

function fallbackCopy(text) {
  const temp = document.createElement("textarea");
  temp.value = text;
  temp.setAttribute("readonly", "readonly");
  temp.style.position = "absolute";
  temp.style.left = "-9999px";
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  addLog("tailor", "Copied the tailored resume draft to the clipboard.");
  renderLogs();
}

function analyzeResume(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const sections = parseResumeSections(lines);
  const experienceEntries = extractExperienceEntries(sections, lines);
  const roleTitles = uniqueTerms(experienceEntries.map((entry) => entry.role).filter(Boolean));
  const roleTokens = extractRoleTokens(roleTitles);
  const summaryText = extractSummaryText(sections, lines);
  const explicitSkills = extractExplicitSkills(sections.skills || []);
  const name = extractName(lines);
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
  const phone = text.match(/(\+?\d[\d\s().-]{7,}\d)/)?.[0] || "";
  const bullets = extractResumeBullets(lines);
  const skills = uniqueTerms([
    ...explicitSkills,
    ...SKILL_LIBRARY.filter((term) => termInText(text, term))
  ]);
  const titles = roleTokens.length ? roleTokens : uniqueTerms(TITLE_LIBRARY.filter((term) => termInText(text, term)));
  const metrics = Array.from(text.matchAll(/\b\d+(?:\.\d+)?%|\$\d+(?:,\d{3})*(?:[kKmM])?|\b\d+\+?\b/g)).map((match) => match[0]);
  const frequentTerms = extractFrequentTerms(text);

  return {
    name,
    email,
    phone,
    skills,
    titles,
    roleTitles,
    roleTokens,
    primaryTitle: roleTitles[0] || "",
    summaryText,
    sections,
    experienceEntries,
    bullets,
    metrics,
    frequentTerms,
    sourceText: text
  };
}

function extractName(lines) {
  const firstLine = lines[0] || "Candidate";
  if (firstLine.length > 50 || firstLine.includes("@") || /\d/.test(firstLine)) {
    return "Candidate";
  }
  return firstLine;
}

function extractBullets(lines) {
  const bullets = lines
    .filter((line) => /^[-*•]/.test(line))
    .map((line) => line.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean);

  if (bullets.length) {
    return bullets;
  }

  return lines
    .filter((line) => line.length > 50)
    .slice(0, 8);
}

function extractFrequentTerms(text) {
  const counts = new Map();
  normalizeText(text)
    .split(" ")
    .filter((word) => word.length > 3 && !STOPWORDS.has(word))
    .forEach((word) => {
      counts.set(word, (counts.get(word) || 0) + 1);
    });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([term]) => term);
}

function extractResumeBullets(lines) {
  const bullets = lines
    .filter((line) => isBulletLine(line))
    .map((line) => cleanBulletLine(line))
    .filter(Boolean);

  if (bullets.length) {
    return bullets;
  }

  return lines
    .filter((line) => line.length > 50)
    .slice(0, 8);
}

function parseResumeSections(lines) {
  const sections = {
    general: []
  };
  let currentSection = "general";

  lines.forEach((line) => {
    const sectionKey = detectResumeSection(line);
    if (sectionKey) {
      currentSection = sectionKey;
      if (!sections[currentSection]) {
        sections[currentSection] = [];
      }
      return;
    }

    if (!sections[currentSection]) {
      sections[currentSection] = [];
    }
    sections[currentSection].push(line);
  });

  return sections;
}

function detectResumeSection(line) {
  const normalized = normalizeText(line);
  return Object.entries(RESUME_SECTION_ALIASES).find(([, aliases]) => aliases.includes(normalized))?.[0] || "";
}

function extractSummaryText(sections, lines) {
  if (sections.summary?.length) {
    return sections.summary.join(" ");
  }

  return lines
    .filter((line, index) => index > 0 && line.length > 45 && !isBulletLine(line))
    .slice(0, 2)
    .join(" ");
}

function extractExplicitSkills(lines) {
  const terms = lines
    .flatMap((line) => line.split(/,|;|\||\/|·/))
    .map((term) => term.trim())
    .filter((term) => term && term.length <= 40);

  const normalizedTerms = uniqueTerms(terms.map((term) => sentenceCase(term)));
  const matchedLibraryTerms = SKILL_LIBRARY.filter((skill) =>
    normalizedTerms.some((term) => termInText(term, skill) || termInText(skill, term))
  );

  return uniqueTerms([
    ...matchedLibraryTerms,
    ...normalizedTerms.filter((term) => term.split(" ").length <= 4)
  ]);
}

function extractExperienceEntries(sections, lines) {
  const sourceLines = sections.experience?.length ? sections.experience : lines;
  const entries = [];
  let currentEntry = null;

  sourceLines.forEach((line) => {
    if (detectResumeSection(line) && !sections.experience?.length) {
      return;
    }

    if (isBulletLine(line)) {
      if (currentEntry) {
        currentEntry.bullets.push(cleanBulletLine(line));
      }
      return;
    }

    if (isLikelyExperienceHeader(line)) {
      if (currentEntry && (currentEntry.role || currentEntry.bullets.length)) {
        entries.push(finalizeExperienceEntry(currentEntry));
      }
      currentEntry = {
        ...parseExperienceHeader(line),
        bullets: []
      };
      return;
    }

    if (currentEntry && line.length > 45) {
      currentEntry.bullets.push(cleanBulletLine(line));
    }
  });

  if (currentEntry && (currentEntry.role || currentEntry.bullets.length)) {
    entries.push(finalizeExperienceEntry(currentEntry));
  }

  if (entries.length) {
    return entries;
  }

  return [{
    role: "",
    company: "",
    dates: "",
    bullets: extractResumeBullets(lines).slice(0, 6)
  }];
}

function isLikelyExperienceHeader(line) {
  if (isBulletLine(line) || line.length > 100) {
    return false;
  }

  return /[|]/.test(line) || /\b(?:19|20)\d{2}\b/.test(line) || /\b(?:present|current)\b/i.test(line) || /\sat\s/i.test(line);
}

function parseExperienceHeader(line) {
  const clean = line.replace(/\s{2,}/g, " ").trim();
  let parts = clean.split(/\s+\|\s+/).map((part) => part.trim()).filter(Boolean);

  if (parts.length === 1 && /\sat\s/i.test(clean)) {
    parts = clean.split(/\sat\s/i).map((part) => part.trim()).filter(Boolean);
  }

  const role = parts[0] || clean;
  const company = parts.find((part, index) => index > 0 && !looksLikeDateRange(part)) || "";
  const dates = parts.find((part, index) => index > 0 && looksLikeDateRange(part)) || "";

  return {
    role,
    company,
    dates
  };
}

function looksLikeDateRange(value) {
  return /\b(?:19|20)\d{2}\b/.test(value) || /\b(?:present|current)\b/i.test(value);
}

function finalizeExperienceEntry(entry) {
  return {
    role: sentenceCase(entry.role || ""),
    company: sentenceCase(entry.company || ""),
    dates: entry.dates || "",
    bullets: uniqueTerms(entry.bullets.filter(Boolean))
  };
}

function extractRoleTokens(roleTitles) {
  return uniqueTerms(
    roleTitles
      .flatMap((title) => normalizeText(title).split(" "))
      .filter((token) => token.length > 2 && !ROLE_TOKEN_STOPWORDS.has(token))
  );
}

function isBulletLine(line) {
  return /^[-*•●▪◦â€¢]/.test(line);
}

function cleanBulletLine(line) {
  return line.replace(/^[-*•●▪◦â€¢]\s*/, "").replace(/\s+/g, " ").trim();
}

function scoreJobs(analysis, jobs, preferences) {
  const targetRoleText = preferences.targetRoles || "";
  const preferredLocation = preferences.preferredLocation || "";

  return jobs
    .map((job) => {
      const matchedSkills = job.keywords.filter((keyword) => hasResumeEvidence(analysis, keyword));
      const missingSkills = job.keywords.filter((keyword) => !matchedSkills.includes(keyword));
      const titleHits = analysis.roleTokens.filter((term) => termInText(job.title, term));
      const targetRoleHits = splitSearchTerms(targetRoleText).filter((term) => termInText(job.title, term));

      let score = matchedSkills.length * 9;
      score += titleHits.length * 8;
      score += Math.min(12, targetRoleHits.length * 6);
      score += scoreLocation(job, preferredLocation, preferences.remoteOnly);
      score += scoreBulletEvidence(analysis.bullets, job.keywords);
      score = Math.max(12, Math.min(98, score));

      const reasons = [];
      if (matchedSkills.length) {
        reasons.push(`Shared skills: ${matchedSkills.slice(0, 4).join(", ")}`);
      }
      if (titleHits.length) {
        reasons.push(`Resume role alignment: ${titleHits.slice(0, 3).join(", ")}`);
      }
      if (scoreLocation(job, preferredLocation, preferences.remoteOnly) > 0) {
        reasons.push(`Location preference fits ${job.location}`);
      }
      if (!reasons.length) {
        reasons.push("General operations and analytics signals overlap with the JD.");
      }

      const fitLabel = score >= 78 ? "Strong fit" : score >= 60 ? "Promising fit" : "Reach";

      return {
        ...job,
        score,
        fitLabel,
        matchedSkills,
        missingSkills: missingSkills.slice(0, 4),
        reasons: reasons.slice(0, 3)
      };
    })
    .sort((a, b) => b.score - a.score);
}

function scoreLocation(job, preferredLocation, remoteOnly) {
  const locationText = normalizeText(preferredLocation);
  const locationOptions = splitFlexibleTerms(preferredLocation);
  let delta = 0;

  if (remoteOnly) {
    delta += job.mode === "Remote" ? 10 : -8;
  }

  if (!locationText) {
    return delta;
  }

  if (
    locationOptions.some((option) => termInText(job.location, option)) ||
    (locationOptions.some((option) => termInText(option, "remote")) && job.mode === "Remote")
  ) {
    delta += 10;
  } else if (job.mode === "Remote") {
    delta += 4;
  }

  return delta;
}

function scoreBulletEvidence(bullets, keywords) {
  let evidence = 0;

  bullets.forEach((bullet) => {
    const overlap = keywords.filter((keyword) => termInText(bullet, keyword)).length;
    if (overlap) {
      evidence += overlap * 2;
    }
    if (/\b\d/.test(bullet) && overlap) {
      evidence += 2;
    }
  });

  return Math.min(20, evidence);
}

function hasResumeEvidence(analysis, keyword) {
  return analysis.skills.includes(keyword) ||
    analysis.frequentTerms.includes(normalizeText(keyword)) ||
    analysis.bullets.some((bullet) => termInText(bullet, keyword)) ||
    termInText(analysis.sourceText, keyword);
}

function buildTailoredResume(analysis, job) {
  const missingSkills = job.missingSkills || job.keywords.filter((keyword) => !hasResumeEvidence(analysis, keyword));
  const selectedSkills = uniqueTerms(
    job.keywords.filter((keyword) => hasResumeEvidence(analysis, keyword))
  ).slice(0, 8);

  const tailoredEntries = selectRelevantExperienceEntries(analysis, job)
    .map((entry) => ({
      role: entry.role || analysis.primaryTitle || "Relevant Experience",
      company: entry.company,
      dates: entry.dates,
      bullets: selectTailoredBullets(entry, job)
    }))
    .filter((entry) => entry.bullets.length);

  const selectedBullets = tailoredEntries.flatMap((entry) => entry.bullets).slice(0, 6);

  const supportingThemes = uniqueTerms([
    ...selectedSkills,
    ...analysis.frequentTerms.filter((term) => termInText(job.description, term))
  ]).slice(0, 4);

  const summaryIntro = buildSummaryIntro(analysis);
  const summarySkills = selectedSkills.length ? selectedSkills.slice(0, 4).join(", ") : "relevant experience from the uploaded resume";
  const summaryThemes = supportingThemes.length ? supportingThemes.join(", ") : "the strongest overlapping responsibilities in the job description";
  const summary = `${summaryIntro} For ${job.title}, this version spotlights ${summarySkills} and prioritizes uploaded resume evidence that aligns with ${summaryThemes}.`;

  const fitNotes = [
    `Pulled the strongest role and bullet evidence directly from ${analysis.primaryTitle || "the uploaded resume"} instead of generating generic filler content.`,
    `Reworded bullets only when the job description and source bullet already supported the same claim.`,
    `Flagged ${missingSkills.length ? missingSkills.join(", ") : "no major keyword gaps"} for manual review before a real application.`
  ];

  const reviewFlags = [
    `Check whether ${job.mode.toLowerCase()} work is acceptable for your preferences.`,
    missingSkills.length
      ? `Decide whether to address the remaining gaps: ${missingSkills.join(", ")}.`
      : "No obvious keyword gaps remain, but you should still review the wording before using it."
  ];

  const plainText = [
    analysis.name,
    `${analysis.primaryTitle || "Candidate"} targeting ${job.title} | ${job.company}`,
    "",
    "TARGETED SUMMARY",
    summary,
    "",
    "RELEVANT SKILLS",
    selectedSkills.join(", "),
    "",
    "TAILORED EXPERIENCE",
    ...tailoredEntries.flatMap((entry) => {
      const heading = [entry.role, entry.company, entry.dates].filter(Boolean).join(" | ");
      return [heading, ...entry.bullets.map((bullet) => `- ${bullet}`), ""];
    }),
    "",
    "ALIGNMENT NOTES",
    ...fitNotes.map((note) => `- ${note}`),
    "",
    "REVIEW FLAGS",
    ...reviewFlags.map((flag) => `- ${flag}`)
  ].join("\n");

  return {
    name: analysis.name,
    title: job.title,
    company: job.company,
    summary,
    sourceTitle: analysis.primaryTitle || buildIdentityPhrase(analysis),
    selectedSkills,
    selectedBullets,
    tailoredEntries,
    fitNotes,
    reviewFlags,
    plainText,
    generator: "local",
    modelUsed: ""
  };
}

function selectRelevantExperienceEntries(analysis, job) {
  const entries = analysis.experienceEntries?.length ? analysis.experienceEntries : [{
    role: analysis.primaryTitle || "",
    company: "",
    dates: "",
    bullets: analysis.bullets
  }];

  return [...entries]
    .map((entry) => ({
      ...entry,
      score: scoreExperienceEntry(entry, job)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function scoreExperienceEntry(entry, job) {
  const roleScore = job.keywords.reduce((sum, keyword) => sum + (termInText(entry.role, keyword) ? 4 : 0), 0);
  const bulletScore = entry.bullets.reduce((sum, bullet) => {
    const overlap = job.keywords.reduce((count, keyword) => count + (termInText(bullet, keyword) ? 3 : 0), 0);
    return sum + overlap + (/\b\d/.test(bullet) ? 1 : 0);
  }, 0);

  return roleScore + bulletScore;
}

function selectTailoredBullets(entry, job) {
  const selected = [...entry.bullets]
    .map((bullet) => ({
      bullet,
      score: job.keywords.reduce((sum, keyword) => sum + (termInText(bullet, keyword) ? 4 : 0), 0) + (/\b\d/.test(bullet) ? 1 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((item) => tailorBulletText(item.bullet, job));

  return selected.length ? selected : entry.bullets.slice(0, 2).map((bullet) => sentenceCase(bullet));
}

function tailorBulletText(bullet, job) {
  const cleaned = sentenceCase(cleanBulletLine(bullet));
  const emphasisKeyword = chooseTailorKeyword(cleaned, job.keywords);

  if (!emphasisKeyword) {
    return cleaned;
  }

  const label = TAILOR_LABELS[emphasisKeyword] || sentenceCase(emphasisKeyword);
  if (termInText(cleaned, label)) {
    return cleaned;
  }

  return `${label}: ${lowercaseFirst(cleaned)}`;
}

function chooseTailorKeyword(bullet, keywords) {
  const directMatches = keywords.filter((keyword) => termInText(bullet, keyword) && TAILOR_LABELS[keyword]);
  if (directMatches.length) {
    return directMatches.sort((left, right) => right.length - left.length)[0];
  }

  const inferredMatches = keywords.filter((keyword) => {
    if (!TAILOR_LABELS[keyword]) {
      return false;
    }

    if (keyword === "workflow automation") {
      return /automate|workflow|python|sql|api/i.test(bullet);
    }
    if (keyword === "stakeholder communication") {
      return /partner|leader|stakeholder|cross-functional/i.test(bullet);
    }
    if (keyword === "process improvement") {
      return /improv|redesign|efficien|reduce|optimi/i.test(bullet);
    }
    if (keyword === "dashboards") {
      return /dashboard|tableau|report/i.test(bullet);
    }
    if (keyword === "analytics" || keyword === "product analytics") {
      return /analy|metric|insight|data/i.test(bullet);
    }
    if (keyword === "recruiting") {
      return /recruit|hiring|candidate|funnel/i.test(bullet);
    }
    if (keyword === "requirements gathering") {
      return /requirement|scope|discovery/i.test(bullet);
    }
    if (keyword === "documentation") {
      return /document|playbook|sop/i.test(bullet);
    }
    if (keyword === "customer onboarding") {
      return /onboarding|customer/i.test(bullet);
    }
    if (keyword === "experimentation") {
      return /experiment|test|hypothesis/i.test(bullet);
    }
    if (keyword === "prompt design") {
      return /prompt|llm|ai/i.test(bullet);
    }
    if (keyword === "operations") {
      return /operations|process|delivery/i.test(bullet);
    }
    if (keyword === "apis") {
      return /api|integration/i.test(bullet);
    }
    return false;
  });

  return inferredMatches[0] || "";
}

function buildSummaryIntro(analysis) {
  const summarySentence = firstSentence(analysis.summaryText);
  if (summarySentence) {
    return summarySentence;
  }

  const title = analysis.primaryTitle || buildIdentityPhrase(analysis);
  if (title) {
    return `${analysis.name} brings experience as ${title}`;
  }

  return `${analysis.name} brings relevant experience from the uploaded resume`;
}

function firstSentence(text) {
  return String(text || "")
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .find(Boolean) || "";
}

function lowercaseFirst(text) {
  const value = String(text || "").trim();
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : "";
}

function buildApplicationPacket(analysis, tailoredResume, job) {
  const missingSkills = job.missingSkills || job.keywords.filter((keyword) => !hasResumeEvidence(analysis, keyword));
  const contactFields = [
    {
      label: "Name",
      value: analysis.name || "Missing",
      complete: Boolean(analysis.name)
    },
    {
      label: "Email",
      value: analysis.email || "Missing",
      complete: Boolean(analysis.email)
    },
    {
      label: "Phone",
      value: analysis.phone || "Missing",
      complete: Boolean(analysis.phone)
    }
  ];

  const fitSnapshot = [
    `Best shared signals: ${tailoredResume.selectedSkills.length ? tailoredResume.selectedSkills.slice(0, 4).join(", ") : "General operations and analytics overlap"}`,
    `Most relevant evidence: ${tailoredResume.selectedBullets[0] || "Resume needs stronger bullet structure for this role."}`,
    `Primary gap to review: ${missingSkills.length ? missingSkills[0] : "No obvious keyword gap from the local matcher."}`
  ];

  const whyInterested = `I am interested in ${job.title} at ${job.company} because the role combines ${job.keywords.slice(0, 3).join(", ")} with cross-functional execution. My background in ${tailoredResume.selectedSkills.slice(0, 3).join(", ") || "closely related experience from my resume"} gives me direct context for the workflow and measurement challenges described in the posting.`;

  const reviewChecklist = [
    {
      id: "truthful_resume",
      label: "Truthfulness check",
      description: "Confirm the tailored resume does not overstate experience or imply qualifications you do not have."
    },
    {
      id: "eligibility_check",
      label: "Eligibility and logistics",
      description: "Confirm work authorization, location fit, and compensation expectations before any live application."
    },
    {
      id: "contact_check",
      label: "Contact details",
      description: "Confirm your email, phone number, and links are current for this application."
    }
  ];

  reviewChecklist.forEach((item) => {
    if (typeof state.applicationReview[item.id] !== "boolean") {
      state.applicationReview[item.id] = false;
    }
  });

  return {
    title: job.title,
    company: job.company,
    status: "ready",
    submittedAt: "",
    contactFields,
    fitSnapshot,
    whyInterested,
    reviewChecklist
  };
}

function buildCustomJob({ title, company, location, description }) {
  const extractedKeywords = uniqueTerms(
    SKILL_LIBRARY.filter((term) => termInText(description, term))
  );
  const frequentTerms = extractFrequentTerms(description).slice(0, 4);
  const keywords = extractedKeywords.length ? extractedKeywords : frequentTerms;
  const firstSentence = description.split(/[.!?]/).map((part) => part.trim()).find(Boolean) || description;

  return {
    id: `custom-${Date.now()}`,
    title,
    company,
    location,
    mode: termInText(location, "remote") || termInText(description, "remote") ? "Remote" : "Flexible",
    platform: "Custom JD",
    summary: firstSentence,
    description,
    keywords,
    requirements: description
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => /experience|must|preferred|should|required/i.test(line))
      .slice(0, 3),
    responsibilities: description
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => /build|lead|partner|design|analyze|own|manage/i.test(line))
      .slice(0, 3)
  };
}

function renderAll() {
  renderLogs();
  renderMatches();
  renderTailoredResume();
  renderApplication();
}

function renderLogs() {
  if (!state.logs.length) {
    refs.agentLog.className = "agent-log empty-state";
    refs.agentLog.textContent = "Run the agent to see its planning, ranking, and tailoring decisions.";
    return;
  }

  refs.agentLog.className = "agent-log";
  refs.agentLog.innerHTML = state.logs
    .slice()
    .reverse()
    .map((entry) => `
      <article class="log-entry">
        <div class="log-head">
          <span class="log-stage">${escapeHtml(entry.stage)}</span>
          <span class="log-time">${escapeHtml(entry.time)}</span>
        </div>
        <p>${escapeHtml(entry.message)}</p>
      </article>
    `)
    .join("");
}

function renderMatches() {
  const matches = state.matches || [];
  if (!matches.length) {
    refs.matchSummary.textContent = "No jobs scored yet.";
    refs.matches.className = "cards-grid empty-state";
    refs.matches.textContent = "Add a resume and run the agent to populate the job board.";
    return;
  }

  const top = matches[0];
  refs.matchSummary.textContent = `${matches.length} jobs scored. Top current match: ${top.title} at ${top.company} (${top.score}).`;
  refs.matches.className = "cards-grid";
  refs.matches.innerHTML = matches
    .map((match) => `
      <article class="job-card ${match.id === state.selectedJobId ? "selected" : ""}">
        <div class="job-topline">
          <div>
            <h3>${escapeHtml(match.title)}</h3>
            <p class="job-meta">${escapeHtml(match.company)} | ${escapeHtml(match.location)} | ${escapeHtml(match.platform)}</p>
          </div>
          <div class="score-pill">
            ${match.score}
            <div class="fit-label">${escapeHtml(match.fitLabel)}</div>
          </div>
        </div>
        <p class="job-summary">${escapeHtml(match.summary)}</p>
        <div class="tag-row">
          ${match.matchedSkills.slice(0, 5).map((skill) => `<span class="tag">${escapeHtml(skill)}</span>`).join("")}
        </div>
        <div class="reason-list">
          ${match.reasons.map((reason) => `<span class="reason-chip">${escapeHtml(reason)}</span>`).join("")}
        </div>
        <div class="gap-list">
          ${match.missingSkills.map((gap) => `<span class="gap-chip">Gap: ${escapeHtml(gap)}</span>`).join("")}
        </div>
        <div class="job-actions">
          <button class="ghost" data-job-action="inspect" data-job-id="${escapeHtml(match.id)}">Focus Job</button>
          <button data-job-action="tailor" data-job-id="${escapeHtml(match.id)}">Tailor Resume</button>
          <button class="ghost" data-job-action="packet" data-job-id="${escapeHtml(match.id)}">Prep Packet</button>
        </div>
      </article>
    `)
    .join("");
}

function renderTailoredResume() {
  if (!state.tailoredResume) {
    refs.resumeOutput.className = "document-view empty-state";
    refs.resumeOutput.textContent = "The best-match job will generate a targeted resume draft here.";
    return;
  }

  const resume = state.tailoredResume;
  refs.resumeOutput.className = "document-view";
  refs.resumeOutput.innerHTML = `
    <div class="status-banner ${resume.generator === "llm" ? "ready" : "pending"}">${escapeHtml(resume.generator === "llm" ? `LLM Draft${resume.modelUsed ? ` · ${resume.modelUsed}` : ""}` : "Local Draft")}</div>
    <h3>${escapeHtml(resume.name)}</h3>
    <p class="doc-subtitle">${escapeHtml(resume.sourceTitle)} tailored for ${escapeHtml(resume.title)} | ${escapeHtml(resume.company)}</p>

    <section class="document-section">
      <h4>Targeted Summary</h4>
      <p>${escapeHtml(resume.summary)}</p>
    </section>

    <section class="document-section">
      <h4>Relevant Skills</h4>
      <div class="tag-row">
        ${resume.selectedSkills.map((skill) => `<span class="tag">${escapeHtml(skill)}</span>`).join("")}
      </div>
    </section>

    <section class="document-section">
      <h4>Tailored Experience</h4>
      ${resume.tailoredEntries.length ? resume.tailoredEntries.map((entry) => `
        <div class="experience-entry">
          <strong>${escapeHtml([entry.role, entry.company, entry.dates].filter(Boolean).join(" | "))}</strong>
          <ul>
            ${entry.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
          </ul>
        </div>
      `).join("") : `<p>This resume needs stronger bullet formatting before the prototype can generate a richer tailored draft.</p>`}
    </section>

    <section class="document-section">
      <h4>Alignment Notes</h4>
      <ul>
        ${resume.fitNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
      </ul>
    </section>

    <section class="document-section">
      <h4>Review Flags</h4>
      <ul>
        ${resume.reviewFlags.map((flag) => `<li>${escapeHtml(flag)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderApplication() {
  if (!state.applicationPacket) {
    refs.applicationOutput.className = "document-view empty-state";
    refs.applicationOutput.textContent = "The application prep packet and review gate will appear here after matching a role.";
    return;
  }

  const packet = state.applicationPacket;
  const statusClass = packet.status === "submitted" ? "submitted" : state.applicationPacket.reviewChecklist.some((item) => !state.applicationReview[item.id]) ? "pending" : "ready";
  const statusLabel = packet.status === "submitted"
    ? `Simulated submit complete${packet.submittedAt ? ` at ${packet.submittedAt}` : ""}`
    : statusClass === "pending"
      ? "Waiting on human review"
      : "Ready for human review";

  refs.applicationOutput.className = "document-view";
  refs.applicationOutput.innerHTML = `
    <div class="status-banner ${statusClass}">${escapeHtml(statusLabel)}</div>
    <h3>${escapeHtml(packet.title)}</h3>
    <p class="doc-subtitle">${escapeHtml(packet.company)}</p>

    <section class="document-section">
      <h4>Autofill Snapshot</h4>
      <div class="packet-grid">
        ${packet.contactFields.map((field) => `
          <span class="field-chip ${field.complete ? "complete" : "missing"}">
            ${escapeHtml(field.label)}: ${escapeHtml(field.value)}
          </span>
        `).join("")}
      </div>
    </section>

    <section class="document-section">
      <h4>Fit Snapshot</h4>
      <ul>
        ${packet.fitSnapshot.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
      </ul>
    </section>

    <section class="document-section">
      <h4>Why This Role</h4>
      <p>${escapeHtml(packet.whyInterested)}</p>
    </section>

    <section class="document-section">
      <h4>Required Human Review Gate</h4>
      <div class="checklist">
        ${packet.reviewChecklist.map((item) => `
          <label class="review-item">
            <input
              class="review-check"
              data-check-id="${escapeHtml(item.id)}"
              type="checkbox"
              ${state.applicationReview[item.id] ? "checked" : ""}
            >
            <span>
              <strong>${escapeHtml(item.label)}</strong>
              <p>${escapeHtml(item.description)}</p>
            </span>
          </label>
        `).join("")}
      </div>
    </section>
  `;
}

function addLog(stage, message) {
  state.logs.push({
    stage: stage.toUpperCase(),
    message,
    time: formatShortTime(new Date())
  });

  if (state.logs.length > 18) {
    state.logs = state.logs.slice(-18);
  }
}

function getAllJobs() {
  return [...BASE_JOBS, ...state.customJobs];
}

function getJobById(jobId) {
  return state.matches.find((job) => job.id === jobId) || getAllJobs().find((job) => job.id === jobId);
}

function splitSearchTerms(text) {
  return text
    .split(/[;,/|]/)
    .map((term) => term.trim())
    .filter(Boolean);
}

function splitFlexibleTerms(text) {
  return String(text || "")
    .split(/,|\/|\||\bor\b|\band\b/i)
    .map((term) => term.trim())
    .filter(Boolean);
}

function termInText(text, term) {
  const haystack = normalizeText(text);
  const needle = normalizeText(term);
  return Boolean(needle) && haystack.includes(needle);
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueTerms(items) {
  return [...new Set(items.filter(Boolean))];
}

function sentenceCase(text) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function buildIdentityPhrase(analysis) {
  const title = analysis.primaryTitle || analysis.roleTitles?.[0] || analysis.titles[0] || "operator";
  const skills = analysis.skills.slice(0, 2);
  if (!skills.length) {
    return `${title} candidate`;
  }
  return `${title} with strengths in ${skills.join(" and ")}`;
}

function formatShortTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function formatLongTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function saveState() {
  const payload = {
    resumeText: state.resumeText,
    preferences: state.preferences,
    llm: state.llm,
    customJobs: state.customJobs,
    analysis: state.analysis,
    matches: state.matches,
    selectedJobId: state.selectedJobId,
    tailoredResume: state.tailoredResume,
    applicationPacket: state.applicationPacket,
    applicationReview: state.applicationReview,
    logs: state.logs
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    state = {
      ...createInitialState(),
      ...parsed,
      preferences: {
        ...createInitialState().preferences,
        ...(parsed.preferences || {})
      },
      llm: {
        ...createInitialState().llm,
        ...(parsed.llm || {})
      },
      applicationReview: parsed.applicationReview || {},
      customJobs: parsed.customJobs || [],
      logs: parsed.logs || []
    };
  } catch (error) {
    state = createInitialState();
  }
}
