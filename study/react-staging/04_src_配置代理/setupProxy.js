const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/api1',
        createProxyMiddleware({ 
            target: 'https://jsonplaceholder.typicode.com', // 请求转发给谁
            /*
             changeOrigin: true, 服务器收到的请求头中Host 是target
             changeOrigin: false, 服务器收到的请求头中Host 是localhost:3000
            */
            changeOrigin: true,
            pathRewrite: {'^/api1': ''} // 重写请求路径(必须)
        })
    )
}