// READ-ONLY — do not modify this file.
const request = require('supertest');
const app = require('../src/index');

describe('GET /ping', () => {
  test('returns 200 with pong: true', async () => {
    const res = await request(app).get('/ping');
    expect(res.status).toBe(200);
    expect(res.body.pong).toBe(true);
  });
  test('includes requestId in response body', async () => {
    const res = await request(app).get('/ping');
    expect(res.body.requestId).toBeDefined();
    expect(typeof res.body.requestId).toBe('string');
  });
  test('includes time in response body', async () => {
    const res = await request(app).get('/ping');
    expect(res.body.time).toBeDefined();
    // Should be a valid ISO string
    expect(() => new Date(res.body.time).toISOString()).not.toThrow();
  });
  test('X-Request-Id header is set', async () => {
    const res = await request(app).get('/ping');
    expect(res.headers['x-request-id']).toBeDefined();
  });
  test('requestId increments across requests', async () => {
    const r1 = await request(app).get('/ping');
    const r2 = await request(app).get('/ping');
    expect(r1.body.requestId).not.toBe(r2.body.requestId);
  });
});

describe('POST /echo-body', () => {
  test('echoes back a simple object', async () => {
    const res = await request(app)
      .post('/echo-body')
      .send({ hello: 'world' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ hello: 'world' });
  });
  test('echoes back a nested object', async () => {
    const payload = { user: { name: 'Alice' }, active: true };
    const res = await request(app).post('/echo-body').send(payload);
    expect(res.body).toEqual(payload);
  });
});

describe('GET /headers', () => {
  test('returns headers object', async () => {
    const res = await request(app)
      .get('/headers')
      .set('X-Custom-Header', 'test-value');
    expect(res.status).toBe(200);
    expect(res.body.headers).toBeDefined();
    expect(res.body.headers['x-custom-header']).toBe('test-value');
  });
});
