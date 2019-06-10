'use strict'

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const configFactory = require('../config/webpack.config')
const webpackConfig = configFactory("development")
const compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(compiler, {
    contentBase: false, 
    hot: true
});

devServer.listen(PORT, HOST, function (err) {
    if (err) {
        console.log(err);
    }
});
console.log(`listen at http://${HOST}:${PORT}`);