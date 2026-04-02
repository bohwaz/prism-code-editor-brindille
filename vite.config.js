import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    modulePreload: {
      polyfill: false,
    },
    //cssMinify: false,
    //minify: 'terser',
    target: ['es6', 'safari14'],
    terserOptions: {
      keep_classnames: true,
      compress: false,
      mangle: false,
      format: { beautify: true },
    },
  },
});
