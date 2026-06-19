# Mini CRM Dashboard

Google Apps Script project for a mini CRM dashboard backed by Google Sheets.

## Configuration

This project uses **Script Properties** for configuration and secrets. No secrets are stored in Git.

Configuration is done manually in Apps Script:

**Project Settings → Script Properties → Add property**

Required property:

| Property         | Description                          |
|------------------|--------------------------------------|
| `SPREADSHEET_ID` | Google Sheets spreadsheet ID to use  |

To verify configuration, run `testConfig()` and check the execution log.

## Project structure

```
src/
├── appsscript.json
├── Main.js
├── Config.js
├── Setup.js
├── Menu.js
├── Sheets.js
├── Clients.js
├── Stats.js
├── Sidebar.html
├── Sidebar.js.html
└── Sidebar.css.html
```

## Development

Push source from `src/` to your linked Apps Script project with [clasp](https://github.com/google/clasp).
