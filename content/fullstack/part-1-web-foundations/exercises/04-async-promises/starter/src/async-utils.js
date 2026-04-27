/**
 * async-utils.js — Async/Await Utility Functions
 *
 * Implement each async function below. The mock data helpers are provided for
 * you — use them inside your implementations instead of real network calls.
 */

// --- Mock data helpers (do not modify) ---

const USERS = {
  1: { id: 1, name: 'Alice', email: 'alice@example.com' },
  2: { id: 2, name: 'Bob', email: 'bob@example.com' },
  3: { id: 3, name: 'Carol', email: 'carol@example.com' },
};

const POSTS = {
  1: [
    { id: 101, userId: 1, title: 'Alice post 1' },
    { id: 102, userId: 1, title: 'Alice post 2' },
  ],
  2: [{ id: 201, userId: 2, title: 'Bob post 1' }],
  3: [],
};

/**
 * _mockFetchUser — internal mock, used by fetchUser.
 * Simulates a 10ms network delay.
 */
function _mockFetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USERS[id];
      if (user) resolve(user);
      else reject(new Error(`User ${id} not found`));
    }, 10);
  });
}

/**
 * _mockFetchPosts — internal mock, used by fetchUserPosts.
 * Simulates a 10ms network delay.
 */
function _mockFetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(POSTS[userId] || []);
    }, 10);
  });
}

// --- Functions to implement ---

/**
 * delay — returns a Promise that resolves (with no value) after `ms` ms.
 * await delay(100) // pauses for 100ms
 */
async function delay(ms) {
  // TODO: return a new Promise that calls setTimeout with resolve
}

/**
 * fetchUser — returns a Promise that resolves with a user object.
 * Uses _mockFetchUser internally.
 * If the user doesn't exist, the promise should reject with an Error.
 *
 * @param {number} id
 * @returns {Promise<{id, name, email}>}
 */
async function fetchUser(id) {
  // TODO: call _mockFetchUser(id) and return the result
}

/**
 * fetchUserPosts — returns a Promise that resolves with an array of posts.
 * Uses _mockFetchPosts internally.
 *
 * @param {number} userId
 * @returns {Promise<Array>}
 */
async function fetchUserPosts(userId) {
  // TODO: call _mockFetchPosts(userId) and return the result
}

/**
 * getUserWithPosts — fetches a user AND their posts, then returns a combined object.
 * The returned object should look like: { ...user, posts: [...] }
 *
 * @param {number} id
 * @returns {Promise<{id, name, email, posts}>}
 */
async function getUserWithPosts(id) {
  // TODO:
  // 1. await fetchUser(id)
  // 2. await fetchUserPosts(id)
  // 3. return the combined object
}

/**
 * fetchAll — fetches multiple users IN PARALLEL given an array of ids.
 * Returns an array of user objects in the same order as the input ids.
 * Uses Promise.all so all requests run concurrently.
 *
 * @param {number[]} ids
 * @returns {Promise<Array>}
 */
async function fetchAll(ids) {
  // TODO: map ids to fetchUser promises and await them all with Promise.all
}

/**
 * safeJsonParse — parses a JSON string and returns the parsed value.
 * If the string is invalid JSON, returns null instead of throwing.
 *
 * safeJsonParse('{"a":1}') → {a: 1}
 * safeJsonParse('not json') → null
 *
 * @param {string} str
 * @returns {any|null}
 */
function safeJsonParse(str) {
  // TODO: use try/catch around JSON.parse
}

module.exports = {
  delay,
  fetchUser,
  fetchUserPosts,
  getUserWithPosts,
  fetchAll,
  safeJsonParse,
};
