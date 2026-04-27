// READ-ONLY — do not modify this file.
const request = require('supertest');
const app = require('../src/index');

describe('GET /notes', () => {
  test('returns empty array initially', async () => {
    const res = await request(app).get('/notes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /notes', () => {
  test('creates a note and returns 201', async () => {
    const res = await request(app).post('/notes').send({ content: 'Test note' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.content).toBe('Test note');
    expect(res.body.done).toBe(false);
    expect(res.body.createdAt).toBeDefined();
  });
  test('returns 400 when content is missing', async () => {
    const res = await request(app).post('/notes').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
  test('returns 400 when content is empty string', async () => {
    const res = await request(app).post('/notes').send({ content: '' });
    expect(res.status).toBe(400);
  });
});

describe('GET /notes/:id', () => {
  test('returns a note by id', async () => {
    const created = await request(app).post('/notes').send({ content: 'Findable note' });
    const id = created.body.id;
    const res = await request(app).get(`/notes/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.content).toBe('Findable note');
  });
  test('returns 404 for unknown id', async () => {
    const res = await request(app).get('/notes/99999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('PUT /notes/:id', () => {
  test('updates a note content', async () => {
    const created = await request(app).post('/notes').send({ content: 'Old content' });
    const id = created.body.id;
    const res = await request(app).put(`/notes/${id}`).send({ content: 'New content' });
    expect(res.status).toBe(200);
    expect(res.body.content).toBe('New content');
  });
  test('updates done flag', async () => {
    const created = await request(app).post('/notes').send({ content: 'Todo' });
    const id = created.body.id;
    const res = await request(app).put(`/notes/${id}`).send({ done: true });
    expect(res.status).toBe(200);
    expect(res.body.done).toBe(true);
  });
  test('returns 404 for unknown id', async () => {
    const res = await request(app).put('/notes/99999').send({ content: 'x' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /notes/:id', () => {
  test('deletes a note and returns 204', async () => {
    const created = await request(app).post('/notes').send({ content: 'To delete' });
    const id = created.body.id;
    const res = await request(app).delete(`/notes/${id}`);
    expect(res.status).toBe(204);
  });
  test('note is no longer retrievable after deletion', async () => {
    const created = await request(app).post('/notes').send({ content: 'Gone' });
    const id = created.body.id;
    await request(app).delete(`/notes/${id}`);
    const res = await request(app).get(`/notes/${id}`);
    expect(res.status).toBe(404);
  });
  test('returns 404 for unknown id', async () => {
    const res = await request(app).delete('/notes/99999');
    expect(res.status).toBe(404);
  });
});
