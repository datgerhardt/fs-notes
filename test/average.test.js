const average = require('../utils/for_test').average

describe('average', () => {
    test('of one avalue is the value itself', () => {
        expect(average([1])).toBe(1)
    })

    test('of many is calculated right', () => {
        expect(average([1,2,3,4,5,6])).toBe(3.5)
    })

    test('of empty array is zero', () => {
        expect(average([])).toBe(0)
    })
})

module.exports = {
    'env': {
      'commonjs': true,
      'es2021': true,
      'node': true,
      'jest': true,
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
      'ecmaVersion': 12
    },
    "rules": {
      // ...
    },
  }