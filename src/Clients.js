function getClients() {
  const sheet = getSheet(getConfig().SHEETS.CLIENTS);
  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return [];
  }

  const rows = values.slice(1);

  return rows.map(function(row) {
    return {
      id: row[0],
      name: row[1],
      email: row[2],
      phone: row[3],
      status: row[4],
      notes: row[5],
      createdAt: row[6] ? row[6].toString() : '',
      updatedAt: row[7] ? row[7].toString() : ''
    };
  });
}
