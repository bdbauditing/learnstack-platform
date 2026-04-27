// READ-ONLY — do not modify this file.
const {
  delay,
  fetchUser,
  fetchUserPosts,
  getUserWithPosts,
  fetchAll,
  safeJsonParse,
} = require('../src/async-utils');

describe('delay', () => {
  test('resolves after the specified time', async () => {
    const start = Date.now();
    await delay(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(40);
  });
  test('resolves (does not reject)', async () => {
    await expect(delay(10)).resolves.toBeUndefined();
  });
});

describe('fetchUser', () => {
  test('resolves with a user object for a valid id', async () => {
    const user = await fetchUser(1);
    expect(user).toMatchObject({ id: 1, name: 'Alice', email: 'alice@example.com' });
  });
  test('resolves with correct user for id 2', async () => {
    const user = await fetchUser(2);
    expect(user.name).toBe('Bob');
  });
  test('rejects for an unknown id', async () => {
    await expect(fetchUser(99)).rejects.toThrow();
  });
});

describe('fetchUserPosts', () => {
  test('resolves with posts array for user 1', async () => {
    const posts = await fetchUserPosts(1);
    expect(posts).toHaveLength(2);
    expect(posts[0].userId).toBe(1);
  });
  test('resolves with empty array for user with no posts', async () => {
    const posts = await fetchUserPosts(3);
    expect(posts).toEqual([]);
  });
});

describe('getUserWithPosts', () => {
  test('returns user properties', async () => {
    const result = await getUserWithPosts(1);
    expect(result.id).toBe(1);
    expect(result.name).toBe('Alice');
    expect(result.email).toBe('alice@example.com');
  });
  test('includes posts array on the result', async () => {
    const result = await getUserWithPosts(1);
    expect(Array.isArray(result.posts)).toBe(true);
    expect(result.posts).toHaveLength(2);
  });
  test('works for user with no posts', async () => {
    const result = await getUserWithPosts(3);
    expect(result.posts).toEqual([]);
  });
});

describe('fetchAll', () => {
  test('fetches multiple users in parallel', async () => {
    const users = await fetchAll([1, 2, 3]);
    expect(users).toHaveLength(3);
    expect(users[0].name).toBe('Alice');
    expect(users[1].name).toBe('Bob');
    expect(users[2].name).toBe('Carol');
  });
  test('returns empty array for empty input', async () => {
    const users = await fetchAll([]);
    expect(users).toEqual([]);
  });
});

describe('safeJsonParse', () => {
  test('parses valid JSON', () => {
    expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 });
  });
  test('parses a JSON array', () => {
    expect(safeJsonParse('[1,2,3]')).toEqual([1, 2, 3]);
  });
  test('returns null for invalid JSON', () => {
    expect(safeJsonParse('not json')).toBeNull();
  });
  test('returns null for empty string', () => {
    expect(safeJsonParse('')).toBeNull();
  });
});
