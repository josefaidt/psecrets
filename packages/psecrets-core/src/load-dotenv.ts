import * as fs from 'node:fs'
import * as dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

/**
 * Load env, heavily inspired by Vite's `loadEnv` function
 * @todo
 */
export function loadEnv(mode: string) {
  const env: Record<string, string> = {}
  const envFiles = []
}
