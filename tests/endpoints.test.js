const request = require('supertest');
const app = require('../server'); // Assuming your Express app is exported from `server.js`

describe('API Endpoints', () => {
  it('GET /status should return a 200 status and "OK"', async () => {
    const res = await request(app).get('/status');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ redis: true, db: true });
  });

  it('GET /stats should return the number of users and files', async () => {
    const res = await request(app).get('/stats');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('users');
    expect(res.body).toHaveProperty('files');
  });

  // Additional tests for all endpoints
  it('POST /users should create a new user', async () => {
    const res = await request(app).post('/users').send({ email: 'test@test.com', password: '12345' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('GET /connect should authenticate a user', async () => {
    const res = await request(app).get('/connect').send({ email: 'test@test.com', password: '12345' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('GET /disconnect should log out a user', async () => {
    const res = await request(app).get('/disconnect').set('Authorization', 'Bearer TOKEN');
    expect(res.statusCode).toBe(204);
  });

  it('GET /users/me should return user details', async () => {
    const res = await request(app).get('/users/me').set('Authorization', 'Bearer TOKEN');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
  });

  it('POST /files should create a new file', async () => {
    const res = await request(app).post('/files').send({ name: 'file.txt', type: 'file', parentId: '0' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('GET /files/:id should retrieve a file', async () => {
    const res = await request(app).get('/files/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', '1');
  });

  it('GET /files with pagination should return files', async () => {
    const res = await request(app).get('/files').query({ page: 1 });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT /files/:id/publish should publish a file', async () => {
    const res = await request(app).put('/files/1/publish');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('isPublic', true);
  });

  it('PUT /files/:id/unpublish should unpublish a file', async () => {
    const res = await request(app).put('/files/1/unpublish');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('isPublic', false);
  });

  it('GET /files/:id/data should return file data', async () => {
    const res = await request(app).get('/files/1/data');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
});

