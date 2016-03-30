'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');

module.exports = {

    context: `${__dirname}/src`,
    entry: './app',
    output: {
        path: `${__dirname}/public/dist`,
        filename: 'scripts.js'
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'],
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 300
    },

    devtool: NODE_ENV === 'development' ? 'cheap-module-inline-source-map' : null,

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },

            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)/,
                include: /\/node_modules\//,
                loader: 'file?name=[1]&regExp=node_modules/(.*)'
            },

            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                exclude: /\/node_modules\//,
                loader: 'file?name=[name].[ext]'
            },

            {
                test: /\.html$/,
                exclude: /\/node_modules\//,
                loader: 'html'
            },

            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /\/node_modules\//,
                query: {
                    presets: ['es2015'],
                }
            }
        ]
    },

    plugins: [
        new ngAnnotatePlugin({
            add: true
        }),
        new ExtractTextPlugin('styles.css'),
        new cleanPlugin(['public/dist']),
    ]
}

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}


