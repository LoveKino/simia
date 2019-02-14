const assert = require('assert');
const {
  flatten,
  isPointInRect
} = require('../src/util');

describe('util', () => {
  it('flatten', () => {
    assert.deepEqual(flatten([1, [2, 4]]), [1, 2, 4]);
  });

  it('isPointInRect', () => {
    assert(isPointInRect(3, 4, 0, 0, 4, 6));
    assert(!isPointInRect(5, 5, 0, 0, 4, 6));
  });
});
