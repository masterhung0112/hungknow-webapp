// Copyright (c) 2021-present HungKnow, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// eslint-disable-next-line no-process-env
const DEV = process.env === 'development';

var config = {
    entry: ['./src/index.ts'],
    output: {

        // publicPath,
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
                test: /\.(jsx?)?$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        sideEffects: false,

                        // Babel configuration is in babel.config.js because jest requires it to be there.
                    },
                },
            },
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {
                test: /\.module.(s?css)$/,
                use: [
                    DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                modules: {
                                    localIdentName: '[name]__[local]__[hash:base64:5]',
                                },
                                sourceMap: true,
                            },
                        },
                    },
                ],
                exclude: /\.module\.(css|scss)$/,
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
                                modules: {
                                    localIdentName: '[local]',
                                },
                                sourceMap: true,
                            },
                        },
                    },
                ],
                exclude: /\.module\.(css|scss)$/,
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
