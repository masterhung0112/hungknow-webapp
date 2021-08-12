// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable tree-shaking/no-side-effects-in-initialization */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// eslint-disable-next-line no-process-env
const DEV = process.env === 'development';

var config = {
    entry: ['./src/index.ts'],
    output: {

        // publicPath,
        // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
        path: path.resolve(__dirname, 'dist'),

        // filename: 'index.js',
        // clean: false,
        // chunkFilename: '[name].[contenthash].js',
        // chunkLoading: 'import',
        // chunkFormat: 'module',
        // library: {
        //     type: 'module',
        // },
        // environment: {
        //     module: true, // force module environment
        // },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'hkui.css',
            chunkFilename: '[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.(js|jsx|ts|tsx)?$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,

                        // Babel configuration is in babel.config.js because jest requires it to be there.
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
};

module.exports = config;
