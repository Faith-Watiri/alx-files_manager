const redisClient = require('../utils/redis');

describe('Redis Client', () => {
  it('should connect to Redis successfully', async () => {
    const isAlive = await redisClient.isAlive();
    expect(isAlive).toBe(true);
  });

  it('should set and get a value from Redis', async () => {
    await redisClient.set('testKey', 'testValue', 10);
    const value = await redisClient.get('testKey');
    expect(value).toBe('testValue');
  });

  it('should handle expired keys correctly', async () => {
    await redisClient.set('tempKey', 'tempValue', 1);
    await new Promise((r) => setTimeout(r, 1500));
    const value = await redisClient.get('tempKey');
    expect(value).toBe(null);
  });
});

