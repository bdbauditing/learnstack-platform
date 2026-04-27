// READ-ONLY — do not modify this file.
const request = require('supertest');
const app = require('../src/index');

describe('GET /ok', () => {
  test('returns 200 with status ok', async () => {
    const res = await request(app).get('/ok');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /fail', () => {
  test('returns 500 status', async () => {
    const res = await request(app).get('/fail');
    expect(res.status).toBe(500);
  });
  test('returns JSON with error property', async () => {
    const res = await request(app).get('/fail');
    expect(res.body.error).toBeDefined();
    expect(typeof res.body.error).toBe('string');
  });
  test('error message matches the thrown error', async () => {
    const res = await request(app).get('/fail');
    expect(res.body.error).toBe('Something broke');
  });
});

describe('GET /fail-custom', () => {
  test('returns 422 status from custom error', async () => {
    const res = await request(app).get('/fail-custom');
    expect(res.status).toBe(422);
  });
  test('returns correct error message', async () => {
    const res = await request(app).get('/fail-custom');
    expect(res.body.error).toBe('Unprocessable');
  });
});

describe('404 handler', () => {
  test('returns 404 for unknown GET route', async () => {
    const res = await request(app).get('/definitely-not-a-route');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
  test('returns 404 for unknown POST route', async () => {
    const res = await request(app).post('/no-such-route').send({});
    expect(res.status).toBe(404);
  });
});
