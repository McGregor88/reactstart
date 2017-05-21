const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const common = merge([
    {
        entry: {
            index: PATHS.src + '/pages/index/index.js',
            blog: PATHS.src + '/pages/blog/blog.js'
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
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
        ]
    },
    pug()
]);
    
module.exports = function(env) {
    if (env === 'production'){
        return merge([
            common,
            extractCSS()
        ]);
    }
    if (env === 'development'){
        return merge([
                common,
                devserver(),
                sass(),
                css()
        ]);
    }
};