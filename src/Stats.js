function getClientStats() {
  const clients = getClients();

  const stats = {
    total: clients.length,
    new: 0,
    active: 0,
    inactive: 0
  };

  clients.forEach(function(client) {
    const status = String(client.status || '').toLowerCase();

    if (status === 'new') {
      stats.new++;
    }

    if (status === 'active') {
      stats.active++;
    }

    if (status === 'inactive') {
      stats.inactive++;
    }
  });

  return stats;
}
