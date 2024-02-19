import request from 'supertest';
import app from '../src/app';

test('GET /matches returns an array of matches', async () => {
  const response = await request(app).get('/matches');
  expect(response.status).toBe(200);
  expect(response.body.matches).toBeDefined();
  expect(Array.isArray(response.body.matches)).toBe(true);
});

test('GET /winner returns null when there is no winner', async () => {
  const response = await request(app).get('/winner');
  expect(response.status).toBe(200);
  expect(response.body.winner).toBeDefined();
  expect(response.body.winner).toBe(null);
});
test('GET /match/:id returns null when the id is incorrect', async () => {
  const response = await request(app).get('/match/id');
  expect(response.status).toBe(200);
  expect(response.body.match).toBeDefined();
  expect(response.body.match).toBe(null);
});

test('PUT /match/:id returns error when the match id is incorrect', async () => {
  const response = await request(app).put('/match/invalid-match-id').send({
    score1: 1,
    score2: 2,
    score3: 3,
  });

  expect(response.status).toBe(200);
  expect(response.body).toEqual({ error: 'The provided match id was not found' });
});
