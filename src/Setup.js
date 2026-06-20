function testConfig() {
  Logger.log(JSON.stringify(getConfig()));
}

function testSpreadsheetConnection() {
  const config = getConfig();

  Logger.log('SPREADSHEET_ID: ' + config.SPREADSHEET_ID);

  const ss = SpreadsheetApp.openById(config.SPREADSHEET_ID);

  Logger.log('Spreadsheet name: ' + ss.getName());

  const sheet = ss.getSheetByName(config.SHEETS.CLIENTS);

  if (!sheet) {
    throw new Error('Clients sheet not found');
  }

  Logger.log('Clients sheet found');
}

function testGetClients() {
  const clients = getClients();

  Logger.log('Clients count: ' + clients.length);
  Logger.log(JSON.stringify(clients, null, 2));
}
