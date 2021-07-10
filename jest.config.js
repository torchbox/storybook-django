module.exports = {
    moduleNameMapper: {
        '\\.(scss|html|md)$': '<rootDir>/demo/static_src/tests/assetMock.js',
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'yml'],
    transform: {
        '^.+\\.yml$': 'jest-yaml-transform',
        '^.+\\.js$': 'babel-jest',
        '^.+\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx',
    },
    testPathIgnorePatterns: [
        '/node_modules/',
        '/static_compiled/',
        '/venv/',
        '/.venv/',
    ],
    collectCoverageFrom: ['<rootDir>/demo/**/*.js'],
    setupFiles: ['<rootDir>/demo/static_src/tests/environment.js'],
    setupFilesAfterEnv: ['<rootDir>/demo/static_src/tests/setupTests.js'],
    testURL: 'http://localhost:8001',
};
