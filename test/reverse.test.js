const reverse = require('../utils/for_test').reverse

test('reverse of a', () => {
    const result = reverse('a')

    expect(result).toBe('a')
})

test('reverse of react', () => {
    const result = reverse('react')
  
    expect(result).toBe('tcaer')
})
  
test('reverse of releveler', () => {
const result = reverse('releveler')

expect(result).toBe('releveler')
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