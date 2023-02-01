import { defineConfig } from 'tsup'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },
  env: {
    PACKAGE_VERSION: pkg.version,
  },
  entry: ['src/cli.ts'],
  format: ['esm'],
  outDir: 'build',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
})
