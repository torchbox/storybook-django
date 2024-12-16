const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Initialises a http-proxy-middleware for Storybook to talk to Django without CORS issues.
 * @param {object} options options
 * @param {string} options.origin where Django runs, for example http://localhost:8000
 * @param {string} options.apiPath API endpoint to render patterns (/pattern-library/api/v1/render-pattern)
 * @param {function} options.proxy http-proxy-middleware module
 */
const createDjangoAPIMiddleware = (options) => {
  const { proxy, apiPath, origin } = options;
  const createProxy = proxy || createProxyMiddleware;
  const middleware = (router) => {
    router.use(
      apiPath,
      createProxy({
        target: `${origin}${apiPath}`,
        changeOrigin: true,
      }),
    );
  };

  return middleware;
};

module.exports = {
  createDjangoAPIMiddleware,
};
