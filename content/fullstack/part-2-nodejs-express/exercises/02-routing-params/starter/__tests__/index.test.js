// READ-ONLY — do not modify this file.
const request = require('supertest');
const app = require('../src/index');

describe('GET /items', () => {
  test('returns all 4 items without filter', async () => {
    const res = await request(app).get('/items');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(4);
  });
  test('filters by category=hardware', async () => {
    const res = await request(app).get('/items?category=hardware');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    res.body.forEach(item => expect(item.category).toBe('hardware'));
  });
  test('filters by category=stationery', async () => {
    const res = await request(app).get('/items?category=stationery');
    expect(res.body).toHaveLength(2);
  });
  test('returns empty array for unknown category', async () => {
    const res = await request(app).get('/items?category=unknown');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('GET /items/:id', () => {
  test('returns item 1 correctly', async () => {
    const res = await request(app).get('/items/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Widget');
  });
  test('returns item 3 correctly', async () => {
    const res = await request(app).get('/items/3');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Notebook');
  });
  test('returns 404 for non-existent id', async () => {
    const res = await request(app).get('/items/99');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('GET /items/:id/label', () => {
  test('returns label for item 2', async () => {
    const res = await request(app).get('/items/2/label');
    expect(res.status).toBe(200);
    expect(res.body.label).toBe('Item #2');
  });
  test('returns 404 label for non-existent item', async () => {
    const res = await request(app).get('/items/99/label');
    expect(res.status).toBe(404);
  });
});

describe('GET /echo', () => {
  test('echoes query params', async () => {
    const res = await request(app).get('/echo?name=Alice&role=admin');
    expect(res.status).toBe(200);
    expect(res.body.query).toEqual({ name: 'Alice', role: 'admin' });
  });
  test('returns empty query object when no params', async () => {
    const res = await request(app).get('/echo');
    expect(res.body.query).toEqual({});
  });
});
