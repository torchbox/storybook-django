module.exports = {
    moduleNameMapper: {
        '\\.(scss|html)$': '<rootDir>/demo/static_src/tests/assetMock.js',
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
