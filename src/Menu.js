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
  const html = HtmlService
    .createTemplateFromFile('Sidebar')
    .evaluate()
    .setTitle('Mini CRM Dashboard');

  SpreadsheetApp.getUi()
    .showSidebar(html);
}
