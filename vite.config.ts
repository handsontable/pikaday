import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: false,
    outDir: '.',
    lib: {
      entry: './src/pikaday.js',
      name: 'Pikaday',
      fileName: (format) => {
        if (format === 'es') {
          return 'pikaday.mjs';

        } else if (format === 'cjs') {
          return 'pikaday.cjs';
        }

        return 'pikaday.js';
      },
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      output: {
        globals: {
          pikaday: 'Pikaday',
        },
      },
    },
  },
});
