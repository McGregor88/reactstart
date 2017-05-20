const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry: {
        index: PATHS.src + '/pages/index/index.js',
        blog: PATHS.src + '/pages/blog/blog.js'
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            template: PATHS.src + '/pages/index/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'blog.html',
            chunks: ['blog'],
            template: PATHS.src + '/pages/blog/blog.pug'
        })
    ], 
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }
        ]
    },
    devServer: {
        stats: 'errors-only'
    }
};

const developmentConfig = {
    devServer: {
        stats: 'errors-only',
        port: 9000
    }
};

module.exports = function(env) {
    if (env === 'production'){
        return common;
    }
    if (env === 'development'){
        return Object.assign(
                {},
                common,
                developmentConfig
         );
    }
};