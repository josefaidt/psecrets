import { defineConfig } from 'tsup'
import { builtinModules } from 'module'
import pkg from './package.json' assert { type: 'json' }
import type { Options as TsupOptions } from 'tsup'

const lib: TsupOptions = {
  entry: ['src/index.ts', 'src/env.ts'],
  format: ['esm'],
  outDir: 'build',
  dts: true,
  sourcemap: true,
  clean: true,
}

const cli: TsupOptions = {
  entry: ['src/cli.ts'],
  format: ['esm'],
  outDir: 'build',
  dts: false,
  sourcemap: false,
  clean: false,
}

export default defineConfig([lib, cli])
