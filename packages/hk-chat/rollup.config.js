import scss from 'rollup-plugin-scss';
import {babel} from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';

// import image from '@rollup/plugin-image';
import url from '@rollup/plugin-url';
import commonjs from '@rollup/plugin-commonjs';
// import multi from '@rollup/plugin-multi-entry';
import json from '@rollup/plugin-json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// {
//     include: ['src/sass/styles.scss'],
//     output: 'dist/hkchat-styles.css',
//     failOnError: true,
//     sourceMap: true,
// }
module.exports = {
    input: './src/index.ts',
    output: {
        dir: 'dist',
        format: 'es',
        sourcemap: true,
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
        globals: {react: 'React'},
    },
    plugins: [
        // multi(),
        nodeResolve({
            mainFields: ['module', 'main', 'jsnext:main', 'browser'],
            extensions,
        }),
        scss(),
        url({
            include: ['**/*.svg', '**/*.(a)?png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp', '**/*.mp3', '**/*.json'],
            fileName: '[name][extname]',
            destDir: 'dist/assets',
        }),
        json({
            exclude: [
                'src/**',
            ],
        }),
        commonjs({
            include: [/node_modules/, /hkreselect/],
        }),
        babel({
            exclude: /node_modules/,
            extensions,
            sourceMaps: true,
        }),
    ],
    external: ['react', 'react-dom', 'react-router-dom', 'react-redux', 'hkselect', 'hkclient-redux', 'redux'],
};
