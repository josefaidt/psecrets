import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  outDir: 'build',
  define: {
    'import.meta.vitest': 'undefined',
  },
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
})
