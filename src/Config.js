function getConfig() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheetId = properties.getProperty('SPREADSHEET_ID');

  if (!spreadsheetId) {
    throw new Error('SPREADSHEET_ID is not configured in Script Properties');
  }

  return {
    SPREADSHEET_ID: spreadsheetId,

    SHEETS: {
      CLIENTS: 'Clients'
    }
  };
}
