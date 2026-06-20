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

function addClient(client) {
  if (!client || !client.name) {
    throw new Error('Client name is required');
  }

  const sheet = getSheet(getConfig().SHEETS.CLIENTS);
  const values = sheet.getDataRange().getValues();
  const now = new Date();

  let nextId = 1;
  if (values.length > 1) {
    const ids = values.slice(1).map(function(row) {
      return Number(row[0]) || 0;
    });
    nextId = Math.max.apply(null, ids) + 1;
  }

  const newClient = {
    id: nextId,
    name: client.name || '',
    email: client.email || '',
    phone: client.phone || '',
    status: client.status || '',
    notes: client.notes || '',
    createdAt: now.toString(),
    updatedAt: now.toString()
  };

  sheet.appendRow([
    newClient.id,
    newClient.name,
    newClient.email,
    newClient.phone,
    newClient.status,
    newClient.notes,
    now,
    now
  ]);

  return newClient;
}
