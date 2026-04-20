# Signal Scout Prototype

Local browser prototype for an agentic job-application assistant with optional OpenAI-powered resume tailoring.

## What It Demonstrates

- Resume intake by paste or `.txt`, `.md`, `.doc`, `.docx`, and `.pdf` upload
- Resume parsing into skills, bullets, measurable outcomes, and title signals
- Job matching against a local job board plus custom pasted job descriptions
- Local truth-preserving resume tailoring for the selected job
- Optional OpenAI-powered rewrite layer for more natural job-specific tailoring
- Application packet prep with a required human review gate before a simulated submit
- Persistent local state using `localStorage`

## Why It Feels Agentic

The prototype does more than answer a single prompt. It:

1. Interprets a user goal from resume + preferences.
2. Searches a set of candidate jobs.
3. Scores and ranks options.
4. Chooses a current best match.
5. Produces tailored artifacts for that specific target.
6. Blocks the final action until a human confirms the risky parts.

## Run It

### Local Quick Start

If you want the easiest local path inside this workspace:

Start the local server:

`C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe server.js`

Or on Windows, run:

`start-server.cmd`

Keep that server window open while you test. If you close it, document uploads will fail.

Then open:

`http://127.0.0.1:4173`

### Standard Node Setup

For a normal machine or deployment target:

1. `npm install`
2. `npm start`
3. Open the host URL shown in the terminal

## Optional LLM Layer

- Turn on `Use OpenAI to tailor the selected resume draft`
- Paste an API key in the UI for the current session, or set `OPENAI_API_KEY` on the server
- Keep the app open at `http://127.0.0.1:4173` while testing; the LLM path needs the local server
- Upload a resume, select or add a job description, then click `Run Agent`
- If the LLM request succeeds, the tailored resume panel will show an `LLM Draft` status banner
- If the LLM request fails, the prototype falls back to the local rules-based draft
- The browser never calls OpenAI directly; requests go through the local server

### Local UI Invocation

1. Start the server with `start-server.cmd` or `npm start`
2. Open `http://127.0.0.1:4173`
3. Upload your resume
4. Check `Use OpenAI to tailor the selected resume draft`
5. Paste an OpenAI API key into the `OpenAI API Key` field
6. Choose a model such as `gpt-5.4-mini`
7. Click `Run Agent`

### Server-Side Environment Variables

- `OPENAI_API_KEY`
  Use this if you want hosted users, including your teacher, to use the LLM layer without entering their own key.
- `OPENAI_MODEL`
  Optional override for the default model. The app currently defaults to `gpt-5.4-mini`.
- `PORT`
  Set automatically by most hosts, but supported explicitly by the server.
- `HOST`
  Optional. The server uses `127.0.0.1` locally and `0.0.0.0` in hosted environments by default.

### Troubleshooting

- If you see `LLM tailoring is offline because the local server is not reachable`, make sure `start-server.cmd` is still running and reload `http://127.0.0.1:4173`.
- If you see an OpenAI error after entering a key, verify the key starts with `sk-` and has access to the selected model.
- If you do not want users to paste a key manually, configure `OPENAI_API_KEY` on the server before deploying.

## Suggested Test Flow

1. Click `Load Sample Resume`.
2. Click `Run Agent`.
3. Switch between matched jobs with `Focus Job`.
4. Add your own job description in the custom section and run the agent again.
5. Review the tailored resume and the application packet.
6. Check the human-review boxes and click `Simulate Submit`.

## Current Boundaries

- No live job-board scraping or real job submission
- Legacy `.doc` extraction is best-effort without Microsoft Word automation, so `.docx` and PDF are more reliable
- Job search is still local or based on a pasted job description
- The final step is intentionally a simulation to avoid unsafe or inaccurate auto-submission

## Publish It

### Option 1: Render

1. Push the `job-agent-prototype` folder to GitHub.
2. Create a new Render Web Service from that repo.
3. Set the service root directory to `job-agent-prototype`.
4. Use build command: `npm install`
5. Use start command: `npm start`
6. Add environment variable `OPENAI_API_KEY` if you want the teacher to use the LLM layer without entering a key.
7. Deploy and share the Render URL.

### Option 2: Railway

1. Push the project to GitHub.
2. Create a new Railway project from the repo.
3. Set the root directory to `job-agent-prototype`.
4. Railway should detect the Node app from `package.json`.
5. Add `OPENAI_API_KEY` if desired.
6. Deploy and share the public URL.

### Option 3: Keep It Local For Class

1. Run `start-server.cmd`
2. Open `http://127.0.0.1:4173`
3. Record a short demo video or screenshots for the PDF
4. Mention that a hosted version can be created using the Render or Railway steps above
