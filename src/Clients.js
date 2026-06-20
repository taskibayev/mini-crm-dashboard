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

function updateClient(client) {
  if (!client || !client.id) {
    throw new Error('Client id is required');
  }

  if (!client.name) {
    throw new Error('Client name is required');
  }

  const sheet = getSheet(getConfig().SHEETS.CLIENTS);
  const values = sheet.getDataRange().getValues();
  const clientId = Number(client.id);

  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    if (Number(values[i][0]) === clientId) {
      rowIndex = i + 1;
      break;
    }
  }

  if (rowIndex === -1) {
    throw new Error('Client not found');
  }

  const now = new Date();
  const createdAt = values[rowIndex - 1][6];

  const updatedClient = {
    id: clientId,
    name: client.name || '',
    email: client.email || '',
    phone: client.phone || '',
    status: client.status || '',
    notes: client.notes || '',
    createdAt: createdAt ? createdAt.toString() : '',
    updatedAt: now.toString()
  };

  sheet.getRange(rowIndex, 2, 1, 5).setValues([[
    updatedClient.name,
    updatedClient.email,
    updatedClient.phone,
    updatedClient.status,
    updatedClient.notes
  ]]);

  sheet.getRange(rowIndex, 8).setValue(now);

  return updatedClient;
}
