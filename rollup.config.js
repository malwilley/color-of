import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import json from 'rollup-plugin-json';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'lib/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'colorOf',
    },
    external: ['color', 'color-diff', 'google-images', 'node-vibrant', 'popsicle'],
    plugins: [
      globals(),
      builtins(),
      json(),
      resolve({
        browser: true,
        extensions: ['.js', '.json'],
      }),
      commonjs(),
      filesize(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    input: 'lib/index.js',
    external: ['color', 'color-diff', 'google-images', 'node-vibrant', 'popsicle'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
