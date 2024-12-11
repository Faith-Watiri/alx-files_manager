const dbClient = require('../utils/db');

describe('Database Client', () => {
  it('should connect to MongoDB successfully', async () => {
    const isAlive = await dbClient.isAlive();
    expect(isAlive).toBe(true);
  });

  it('should return the correct number of documents in a collection', async () => {
    const nbUsers = await dbClient.nbUsers();
    expect(typeof nbUsers).toBe('number');

    const nbFiles = await dbClient.nbFiles();
    expect(typeof nbFiles).toBe('number');
  });
});

