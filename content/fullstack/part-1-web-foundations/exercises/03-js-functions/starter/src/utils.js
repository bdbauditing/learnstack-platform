/**
 * utils.js — JavaScript Utility Functions
 *
 * Implement each function below. Use modern JS (arrow functions, array methods,
 * spread/rest, destructuring). Do NOT use any loops (for/while) — practice
 * using .map(), .filter(), .reduce(), etc.
 */

/**
 * sum — returns the sum of all numbers in the array.
 * sum([1, 2, 3]) → 6
 * sum([]) → 0
 */
function sum(numbers) {
  // TODO: implement using Array.reduce
}

/**
 * capitalize — returns the string with its first character uppercased
 * and the rest lowercased.
 * capitalize("hello") → "Hello"
 * capitalize("WORLD") → "World"
 * capitalize("") → ""
 */
function capitalize(str) {
  // TODO: implement using string slice and toUpperCase/toLowerCase
}

/**
 * uniqueValues — returns a new array with duplicate values removed.
 * Order must be preserved (first occurrence kept).
 * uniqueValues([1, 2, 2, 3, 1]) → [1, 2, 3]
 * uniqueValues(["a", "b", "a"]) → ["a", "b"]
 */
function uniqueValues(arr) {
  // TODO: implement — hint: Set converts to unique values
}

/**
 * groupBy — groups an array of objects by the value of a given key.
 * groupBy([{type:"a",val:1},{type:"b",val:2},{type:"a",val:3}], "type")
 *   → { a: [{type:"a",val:1},{type:"a",val:3}], b: [{type:"b",val:2}] }
 */
function groupBy(arr, key) {
  // TODO: implement using Array.reduce — accumulate into an object
}

/**
 * pick — returns a new object containing only the specified keys.
 * pick({a:1, b:2, c:3}, ["a","c"]) → {a:1, c:3}
 * Keys that don't exist in the object are simply omitted.
 */
function pick(obj, keys) {
  // TODO: implement — hint: use Object.fromEntries + filter
}

/**
 * flattenOnce — flattens an array exactly one level deep.
 * flattenOnce([1, [2, 3], [4, [5]]]) → [1, 2, 3, 4, [5]]
 */
function flattenOnce(arr) {
  // TODO: implement — hint: Array.prototype.flat(1) or reduce with concat
}

/**
 * zipToObject — combines two arrays into one object.
 * The first array contains keys, the second contains values.
 * Arrays will always be the same length.
 * zipToObject(["a","b","c"], [1,2,3]) → {a:1, b:2, c:3}
 */
function zipToObject(keys, values) {
  // TODO: implement — hint: Object.fromEntries + keys.map
}

module.exports = {
  sum,
  capitalize,
  uniqueValues,
  groupBy,
  pick,
  flattenOnce,
  zipToObject,
};
