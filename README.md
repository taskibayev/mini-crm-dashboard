# Mini CRM Dashboard

A lightweight customer relationship management tool built with **Google Apps Script** and **Google Sheets**. Manage clients directly from a spreadsheet sidebar — no external database or hosting required.

## Business Problem

Small teams and solo operators often need a simple way to track client contact details and status without adopting a full CRM platform. This project solves that by turning a Google Sheet into a functional CRM with a sidebar UI for everyday tasks: adding, viewing, searching, editing, and deleting clients.

## Features

- **Client list** — load and display all clients from Google Sheets
- **Add client** — create new records with auto-generated IDs and timestamps
- **Edit client** — update existing records in place
- **Delete client** — remove records with confirmation
- **Search** — filter clients by name, email, phone, status, or notes
- **Statistics** — live counts for total, new, active, and inactive clients
- **Configuration via Script Properties** — no secrets stored in source code

## Workflow

1. Configure `SPREADSHEET_ID` in Script Properties (see below).
2. Push code to Apps Script with clasp.
3. Open the linked Google Spreadsheet.
4. Use **Mini CRM → Open Dashboard** to open the sidebar.
5. Add, search, edit, or delete clients — changes persist to the Clients sheet immediately.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Google Apps Script (V8) |
| Data store | Google Sheets |
| UI | HTML sidebar (`HtmlService`) |
| Client ↔ server | `google.script.run` |
| Local development | [clasp](https://github.com/google/clasp) |

## Spreadsheet Schema

Create a sheet named **Clients** with the following header row (row 1):

| Column | Header | Description |
|--------|--------|-------------|
| A | ID | Auto-generated numeric ID |
| B | Name | Client name (required) |
| C | Email | Email address |
| D | Phone | Phone number |
| E | Status | e.g. `new`, `active`, `inactive` (used by statistics) |
| F | Notes | Free-text notes |
| G | Created At | Set automatically on create |
| H | Updated At | Set automatically on create/update |

## Script Properties Setup

This project uses **Script Properties** for configuration. No secrets are committed to Git.

In the Apps Script editor:

**Project Settings → Script Properties → Add property**

| Property | Required | Description |
|----------|----------|-------------|
| `SPREADSHEET_ID` | Yes | Google Sheets spreadsheet ID |

The spreadsheet ID is the long string in the sheet URL between `/d/` and `/edit`.

To verify configuration, run `testConfig()` in the Apps Script editor and check the execution log.

## clasp Setup

1. Install clasp: `npm install -g @google/clasp`
2. Log in: `clasp login`
3. Create `.clasp.json` in the project root (not committed to Git):

```json
{
  "scriptId": "YOUR_APPS_SCRIPT_PROJECT_ID",
  "rootDir": "src"
}
```

4. Push source: `clasp push`
5. Open the project: `clasp open`

## How to Open the Dashboard

1. Open the Google Spreadsheet linked to your Apps Script project.
2. In the menu bar, click **Mini CRM → Open Dashboard**.
3. The sidebar opens with the client form, statistics, search, and client list.

> The custom menu is registered by `onOpen()`. If the menu does not appear, reload the spreadsheet or run `onOpen` once from the Apps Script editor.

## Project Structure

```
src/
├── appsscript.json    # Apps Script manifest (timezone, runtime)
├── Main.js            # HTML template include helper
├── Config.js          # Script Properties and sheet name config
├── Setup.js           # Diagnostic test functions
├── Menu.js            # Custom menu and sidebar launcher
├── Sheets.js          # Spreadsheet access helpers
├── Clients.js         # Client CRUD operations
├── Stats.js           # Client statistics
├── Sidebar.html       # Sidebar markup
├── Sidebar.js.html    # Sidebar client-side logic
└── Sidebar.css.html   # Sidebar styles
```

## Diagnostic Functions

Run these from the Apps Script editor (**Run → select function → Execution log**):

| Function | Purpose |
|----------|---------|
| `testConfig()` | Log current configuration (including `SPREADSHEET_ID`) |
| `testSpreadsheetConnection()` | Open spreadsheet, verify Clients sheet exists |
| `testGetClients()` | Fetch and log all clients as JSON |

## Future Improvements

- Status dropdown instead of free-text input for consistent statistics
- Activity logging sheet for audit trail
- Export clients to CSV
- Pagination or virtual scrolling for large client lists
- Screenshots and demo video in README

## Development

Push changes from `src/` to your linked Apps Script project:

```bash
clasp push
```

Ensure `.clasp.json` is present locally but never committed — it is listed in `.gitignore`.
