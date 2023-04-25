import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

const lib: Options = {
  define: {
    'import.meta.vitest': 'undefined',
  },
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'build',
  platform: 'node',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
}

const cli: Options = {
  define: {
    'import.meta.vitest': 'undefined',
  },
  entry: ['src/cli.ts'],
  format: ['esm'],
  outDir: 'build',
  platform: 'node',
  dts: false,
  splitting: true,
  sourcemap: false,
  clean: false,
}

export default [lib, cli]
