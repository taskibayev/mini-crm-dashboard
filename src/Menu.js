function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Mini CRM')
    .addItem(
      'Open Dashboard',
      'showSidebar'
    )
    .addToUi();
}

function showSidebar() {
  const html =
    HtmlService.createHtmlOutputFromFile(
      'Sidebar'
    )
    .setTitle('Mini CRM Dashboard');

  SpreadsheetApp.getUi()
    .showSidebar(html);
}
