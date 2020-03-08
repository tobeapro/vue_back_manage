const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
    publicPath: './',
    productionSourceMap: false,
    configureWebpack:{
        plugins:[
            process.env.NODE_ENV ==='production' && new CompressionWebpackPlugin({
                algorithm: "gzip",
                test: /\.(js|css)$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ].filter(Boolean)
    }
}