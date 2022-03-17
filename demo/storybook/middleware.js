const { createDjangoAPIMiddleware } = require('../../src/middleware');

const origin = process.env.TEST_ORIGIN ?? 'http://localhost:8001';

module.exports = createDjangoAPIMiddleware({
  origin,
  apiPath: ['/pattern-library/'],
});
