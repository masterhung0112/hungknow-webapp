import {babel} from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import styles from 'rollup-plugin-styles';

import url from '@rollup/plugin-url';
import commonjs from '@rollup/plugin-commonjs';

import json from '@rollup/plugin-json';
import path from 'path';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = {
    input: {
        index: './src/index.ts',
        app: './src/components/app',
        root: './src/components/root',
        utils: './src/utils',
        admin_console: './src/components/admin_console',
        login_controller: './src/components/login/login_controller',
        logged_in: './src/components/logged_in',
        password_reset_send_link: './src/components/password_reset_send_link',
        password_reset_form: './src/components/password_reset_form',
        signup_controller: './src/components/signup/signup_controller',
        signup_email: './src/components/signup/signup_email',
        terms_of_service: './src/components/terms_of_service',
        should_verify_email: './src/components/should_verify_email',
        do_verify_email: './src/components/do_verify_email',
        claim: './src/components/claim',
        help_controller: './src/components/help/help_controller',
        linking_landing_page: './src/components/linking_landing_page',
        select_team: './src/components/select_team',
        authorize: './src/components/authorize',
        create_team: './src/components/create_team',
        mfa_controller: './src/components/mfa/mfa_controller',
    },
    output: {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
        assetFileNames: '[name][extname]',
        // exports: 'named',
    },
    plugins: [

        // multi(),
        nodeResolve({
            mainFields: ['module', 'main', 'jsnext:main', 'browser'],
            extensions,
        }),
        url({
            include: ['**/*.svg', '**/*.(a)?png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp', '**/*.mp3', '**/*.json', '**/*.woff2', '**/*.woff'],
            fileName: '[name][extname]',
            destDir: 'dist/assets',
        }),

        // scss({
        //     options: {
        //         sourceMap: true,
        //     },
        //     includePaths: [
        //         path.join(__dirname, '../../node_modules/compass-mixins/lib'),
        //         path.join(__dirname, './src/sass'),
        //         path.join(__dirname, './src'),
        //     ],
        //     output: 'dist/hkchat-styles.css',
        //     processor: (css) => postcss([
        //         postcssUrl({
        //             url: 'copy', // enable inline assets using base64 encoding
        //             // maxSize: 10, // maximum file size to inline (in kilobytes)
        //             // fallback: 'copy', // fallback method to use if max size is exceeded
        //             assetsPath: 'dist/assets',
        //         }),
        //     ]).
        //         process(css).
        //         then((result) => result.css),
        // }),

        styles({
            mode: ['extract', 'hkchat-styles.css'],
            sourceMap: true,
            url: {
                publicPath: 'assets',
                hash: false,
            },
            sass: {
                includePaths: [
                    path.join(__dirname, '../../node_modules/compass-mixins/lib'),
                    path.join(__dirname, './src/sass'),
                    path.join(__dirname, './src'),
                ],
            },
        }),

        babel({
            exclude: /node_modules/,
            extensions,
            configFile: path.resolve(__dirname, 'babel.config.js'),
        }),
        commonjs({
            exclude: [
                'src/**',
            ],
        }),
        json({
            exclude: [
                'src/**',
            ],
        }),
    ],
    external: ['react', 'react-dom', 'react-router-dom', 'react-redux', 'hkreselect', 'hkclient-redux', 'redux', 'marked', 'fastclick'],
};
