import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  sourcemap: false,
  minify: false,
  treeshake: true,
  splitting: false,
  outDir: 'dist',
  esbuildOptions(options) {
    options.sourcemap = false;
  }
}); 