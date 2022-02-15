const { createDjangoAPIMiddleware } = require('../../src/middleware');

module.exports = createDjangoAPIMiddleware({
    origin: 'http://localhost:8001',
    apiPath: '/pattern-library/api/v1/render-pattern',
});
