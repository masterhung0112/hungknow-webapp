import { nodeResolve } from '@rollup/plugin-node-resolve';

import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import path from 'path';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = {
    input: {
        index: './src/index.ts',
    },
    output: [{
        dir: 'dist',
        format: 'es',
        sourcemap: true,
        assetFileNames: '[name][extname]',
    },
    {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
        assetFileNames: '[name][extname]',
    }],
    plugins: [
        nodeResolve({
            mainFields: ['module', 'main', 'jsnext:main', 'browser'],
            extensions,
        }),

        commonjs({
            exclude: [
                'src/**',
            ],
        }),
        typescript()
    ],
    external: ['typescript'],
};
