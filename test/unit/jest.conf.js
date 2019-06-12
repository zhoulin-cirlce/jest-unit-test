const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    'mand-mobile': '<rootDir>/node_modules/mand-mobile'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e'
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**'
  ],
  verbose: false, // 控制台输出详细测试信息
  'testURL': 'http://localhost/',
  'reporters': [
    'default',
    [
      'jest-html-reporters',
      {
        'publicPath': './reporter',
        'filename': 'reporter.html'
      }
    ]
  ],
  'testMatch': [
    '**/?(*.)(spec|test|e2e).js?(x)'
  ],
  'coverageReporters': [
    'html',
    'text-summary',
    'json',
    'lcov'
  ]

}
