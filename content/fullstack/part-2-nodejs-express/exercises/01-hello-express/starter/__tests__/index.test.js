// READ-ONLY — do not modify this file.
const request = require('supertest');
const app = require('../src/index');

describe('GET /hello', () => {
  test('responds with status 200', async () => {
    const res = await request(app).get('/hello');
    expect(res.status).toBe(200);
  });
  test('responds with JSON', async () => {
    const res = await request(app).get('/hello');
    expect(res.headers['content-type']).toMatch(/json/);
  });
  test('responds with correct message', async () => {
    const res = await request(app).get('/hello');
    expect(res.body).toEqual({ message: 'Hello, World!' });
  });
});

describe('GET /health', () => {
  test('responds with status 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });
  test('responds with status "ok"', async () => {
    const res = await request(app).get('/health');
    expect(res.body.status).toBe('ok');
  });
  test('includes a timestamp field', async () => {
    const res = await request(app).get('/health');
    expect(res.body.timestamp).toBeDefined();
  });
  test('timestamp is a valid ISO string', async () => {
    const res = await request(app).get('/health');
    expect(() => new Date(res.body.timestamp).toISOString()).not.toThrow();
  });
});

describe('Unknown routes', () => {
  test('returns 404 for unknown GET route', async () => {
    const res = await request(app).get('/not-a-route');
    expect(res.status).toBe(404);
  });
});
