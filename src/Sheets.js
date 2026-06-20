function getSheet(sheetName) {
  if (!sheetName) {
    throw new Error('Sheet name is required');
  }

  const config = getConfig();

  if (!config.SPREADSHEET_ID) {
    throw new Error('SPREADSHEET_ID is not configured in Script Properties');
  }

  return SpreadsheetApp
    .openById(config.SPREADSHEET_ID)
    .getSheetByName(sheetName);
}
