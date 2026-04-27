// READ-ONLY — do not modify this file.
const request = require('supertest');
const app = require('../src/index');

describe('POST /todos', () => {
  test('creates a todo with required fields', async () => {
    const res = await request(app).post('/todos').send({ title: 'Buy milk' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe('Buy milk');
    expect(res.body.completed).toBe(false);
    expect(res.body.priority).toBe('medium');
    expect(res.body.createdAt).toBeDefined();
  });
  test('creates a todo with all fields specified', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: 'Clean house', description: 'All rooms', priority: 'high' });
    expect(res.status).toBe(201);
    expect(res.body.description).toBe('All rooms');
    expect(res.body.priority).toBe('high');
  });
  test('returns 400 when title is missing', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
  test('returns 400 when title is empty string', async () => {
    const res = await request(app).post('/todos').send({ title: '' });
    expect(res.status).toBe(400);
  });
  test('returns 400 for invalid priority', async () => {
    const res = await request(app).post('/todos').send({ title: 'Test', priority: 'urgent' });
    expect(res.status).toBe(400);
  });
});

describe('GET /todos', () => {
  beforeAll(async () => {
    await request(app).post('/todos').send({ title: 'Low task', priority: 'low' });
    await request(app).post('/todos').send({ title: 'High task', priority: 'high' });
    const r = await request(app).post('/todos').send({ title: 'Done task', priority: 'low' });
    await request(app).patch(`/todos/${r.body.id}`).send({ completed: true });
  });

  test('returns all todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(3);
  });
  test('filters by completed=true', async () => {
    const res = await request(app).get('/todos?completed=true');
    res.body.forEach(t => expect(t.completed).toBe(true));
  });
  test('filters by completed=false', async () => {
    const res = await request(app).get('/todos?completed=false');
    res.body.forEach(t => expect(t.completed).toBe(false));
  });
  test('filters by priority=low', async () => {
    const res = await request(app).get('/todos?priority=low');
    res.body.forEach(t => expect(t.priority).toBe('low'));
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});

describe('GET /todos/:id', () => {
  test('returns a specific todo', async () => {
    const created = await request(app).post('/todos').send({ title: 'Find me' });
    const res = await request(app).get(`/todos/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Find me');
  });
  test('returns 404 for unknown id', async () => {
    const res = await request(app).get('/todos/99999');
    expect(res.status).toBe(404);
  });
});

describe('PUT /todos/:id', () => {
  test('replaces all mutable fields', async () => {
    const created = await request(app).post('/todos').send({ title: 'Original' });
    const id = created.body.id;
    const res = await request(app).put(`/todos/${id}`).send({ title: 'Updated', priority: 'high', completed: true });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated');
    expect(res.body.priority).toBe('high');
    expect(res.body.completed).toBe(true);
    expect(res.body.updatedAt).toBeDefined();
  });
  test('returns 400 if title missing on PUT', async () => {
    const created = await request(app).post('/todos').send({ title: 'Need title' });
    const res = await request(app).put(`/todos/${created.body.id}`).send({ priority: 'low' });
    expect(res.status).toBe(400);
  });
  test('returns 404 for unknown id', async () => {
    const res = await request(app).put('/todos/99999').send({ title: 'x' });
    expect(res.status).toBe(404);
  });
});

describe('PATCH /todos/:id', () => {
  test('updates only provided fields', async () => {
    const created = await request(app).post('/todos').send({ title: 'Partial', priority: 'low' });
    const id = created.body.id;
    const res = await request(app).patch(`/todos/${id}`).send({ completed: true });
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
    expect(res.body.priority).toBe('low'); // unchanged
    expect(res.body.title).toBe('Partial'); // unchanged
  });
  test('returns 400 for invalid priority in PATCH', async () => {
    const created = await request(app).post('/todos').send({ title: 'Patch me' });
    const res = await request(app).patch(`/todos/${created.body.id}`).send({ priority: 'extreme' });
    expect(res.status).toBe(400);
  });
});

describe('DELETE /todos/:id', () => {
  test('returns 204 on deletion', async () => {
    const created = await request(app).post('/todos').send({ title: 'Delete me' });
    const res = await request(app).delete(`/todos/${created.body.id}`);
    expect(res.status).toBe(204);
  });
  test('todo is gone after deletion', async () => {
    const created = await request(app).post('/todos').send({ title: 'Gone' });
    const id = created.body.id;
    await request(app).delete(`/todos/${id}`);
    const res = await request(app).get(`/todos/${id}`);
    expect(res.status).toBe(404);
  });
  test('returns 404 for unknown id', async () => {
    const res = await request(app).delete('/todos/99999');
    expect(res.status).toBe(404);
  });
});
