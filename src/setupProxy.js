const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = app => {
    app.use(createProxyMiddleware(
        ['/api', '/auth'],
            {
                target: 'http://10.150.149.114:8080',
                changeOrigin: true,
            }
        )
    )
}