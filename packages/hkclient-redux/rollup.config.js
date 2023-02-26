// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import resolve from 'rollup-plugin-node-resolve'

import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json';

// eslint-disable-next-line no-process-env
const production = process.env.NODE_ENV === 'production'

// , 'websocket_client'
const inputs = ['index']
// eslint-disable-next-line no-process-env
// const buildFolder = process.env.OUTPUT_FOLDER || '.'

module.exports = inputs.map((input) => ({
  input: `./src/${input}.ts`,
  treeshake: Boolean(production),
  output: [
    {
      format: 'cjs',
      file: `dist/hk-client-redux.js`,
      sourcemap: true,
      exports: 'named',
    },
    {
      format: 'esm',
      file: `dist/hk-client-redux.esm.js`,
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfigOverride: {
        compilerOptions: { module: 'esnext' },
      },
      // eslint-disable-next-line global-require
      typescript: require('ttypescript'),
      rollupCommonJSResolveHack: true,
      exclude: '**/__tests__/**',
      clean: true,
    }),
    commonjs({
      include: ['./node_modules/**', '../../node_modules/**', '../hkreselect/dist/**'],
    }),
    json({
      exclude: [
          'src/**',
      ],
  }),

    // only minify if in production
    production && terser(),
  ],
}))
