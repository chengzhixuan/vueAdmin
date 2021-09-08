const path = require('path');
module.exports = {
    lintOnSave: false,
    publicPath: './',
    devServer: {
        proxy: {
            '/help': {
                target: 'https://help.chuanmeidayin.com',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/help': '/help2',
                },
                cookieDomainRewrite: {
                    '*': '',
                },
            },
        },
    },
};
