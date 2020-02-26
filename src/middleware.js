// https://github.com/chimurai/http-proxy-middleware/issues/40#issuecomment-249430255
const restream = (proxyReq, req) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
};

/**
 * Initialises a http-proxy-middleware for Storybook to talk to Django without CORS issues.
 * @param {object} options options
 * @param {object} options.proxy http-proxy-middleware module
 * @param {string} options.apiPath e.g. /api/v1/pattern-library/
 * @param {string} options.djangoDomain e.g. http://localhost:8000
 */
const createDjangoAPIMiddleware = (options) => {
    const { proxy, apiPath, djangoDomain } = options;
    const middleware = (router) => {
        router.use(
            apiPath,
            proxy({
                target: djangoDomain,
                changeOrigin: true,
                onProxyReq: restream,
            }),
        );
    };

    return middleware;
};

module.exports = {
    createDjangoAPIMiddleware,
};
