const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = app => {
    app.use(createProxyMiddleware(
        ['/api', '/auth'],
            {
                target: 'http://localhost:8080',
                changeOrigin: true,
            }
        )
    )
}