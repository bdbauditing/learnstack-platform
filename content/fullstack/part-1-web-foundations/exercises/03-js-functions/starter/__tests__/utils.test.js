// READ-ONLY — do not modify this file.
const { sum, capitalize, uniqueValues, groupBy, pick, flattenOnce, zipToObject } = require('../src/utils');

describe('sum', () => {
  test('sums an array of positive numbers', () => {
    expect(sum([1, 2, 3])).toBe(6);
  });
  test('returns 0 for an empty array', () => {
    expect(sum([])).toBe(0);
  });
  test('handles negative numbers', () => {
    expect(sum([-1, -2, 3])).toBe(0);
  });
  test('handles a single element', () => {
    expect(sum([42])).toBe(42);
  });
});

describe('capitalize', () => {
  test('capitalizes a lowercase word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
  test('lowercases the rest of the string', () => {
    expect(capitalize('WORLD')).toBe('World');
  });
  test('returns empty string unchanged', () => {
    expect(capitalize('')).toBe('');
  });
  test('handles a single character', () => {
    expect(capitalize('a')).toBe('A');
  });
});

describe('uniqueValues', () => {
  test('removes duplicate numbers', () => {
    expect(uniqueValues([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });
  test('removes duplicate strings', () => {
    expect(uniqueValues(['a', 'b', 'a'])).toEqual(['a', 'b']);
  });
  test('returns original array if no duplicates', () => {
    expect(uniqueValues([1, 2, 3])).toEqual([1, 2, 3]);
  });
  test('returns empty array for empty input', () => {
    expect(uniqueValues([])).toEqual([]);
  });
});

describe('groupBy', () => {
  const items = [
    { type: 'fruit', name: 'apple' },
    { type: 'veggie', name: 'carrot' },
    { type: 'fruit', name: 'banana' },
  ];

  test('groups by key correctly', () => {
    const result = groupBy(items, 'type');
    expect(result.fruit).toHaveLength(2);
    expect(result.veggie).toHaveLength(1);
  });
  test('includes the full objects in groups', () => {
    const result = groupBy(items, 'type');
    expect(result.fruit[0].name).toBe('apple');
    expect(result.fruit[1].name).toBe('banana');
  });
  test('returns empty object for empty array', () => {
    expect(groupBy([], 'type')).toEqual({});
  });
});

describe('pick', () => {
  test('picks specified keys', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });
  test('omits keys not in the list', () => {
    const result = pick({ x: 10, y: 20, z: 30 }, ['x']);
    expect(result).not.toHaveProperty('y');
    expect(result).not.toHaveProperty('z');
  });
  test('ignores keys that do not exist on the object', () => {
    expect(pick({ a: 1 }, ['a', 'missing'])).toEqual({ a: 1 });
  });
  test('returns empty object when keys list is empty', () => {
    expect(pick({ a: 1 }, [])).toEqual({});
  });
});

describe('flattenOnce', () => {
  test('flattens one level deep', () => {
    expect(flattenOnce([1, [2, 3], [4]])).toEqual([1, 2, 3, 4]);
  });
  test('does not flatten nested arrays beyond one level', () => {
    expect(flattenOnce([1, [2, [3]]])).toEqual([1, 2, [3]]);
  });
  test('returns empty array for empty input', () => {
    expect(flattenOnce([])).toEqual([]);
  });
  test('handles already flat array', () => {
    expect(flattenOnce([1, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe('zipToObject', () => {
  test('zips keys and values into an object', () => {
    expect(zipToObject(['a', 'b', 'c'], [1, 2, 3])).toEqual({ a: 1, b: 2, c: 3 });
  });
  test('returns empty object for empty arrays', () => {
    expect(zipToObject([], [])).toEqual({});
  });
  test('works with string values', () => {
    expect(zipToObject(['name', 'role'], ['Alice', 'admin'])).toEqual({ name: 'Alice', role: 'admin' });
  });
});
