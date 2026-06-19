function getConfig() {
  const properties = PropertiesService.getScriptProperties();

  return {
    SPREADSHEET_ID: properties.getProperty('SPREADSHEET_ID'),

    SHEETS: {
      CLIENTS: 'Clients',
      LOGS: 'Logs'
    }
  };
}
