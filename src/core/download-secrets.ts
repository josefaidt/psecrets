import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { EOL } from 'node:os'
import * as dotenv from 'dotenv'
import { z } from 'zod'
import { getSecrets } from './get-secrets.js'
import type { Project } from '@/support/Project.js'

const schema = z.object({
  filename: z.string().default('.env'),
})

export type DownloadSecretOptions = z.infer<typeof schema>

function createDotEnvContent(secrets: Record<string, string>) {
  return Object.entries(secrets)
    .map(([key, value]) => `${key}=${value}`)
    .join(EOL)
}

/**
 * Downlaod secrets from SSM into a local file
 * @todo write into env-specific .local env files
 */
export async function downloadSecrets(
  project: Project,
  options?: DownloadSecretOptions
): Promise<void> {
  const secrets = await getSecrets(project)
  const opts = schema.parse(options || {})
  const filename = path.resolve(opts.filename)
  const existing = await fs.readFile(filename, 'utf-8').catch(() => '')
  let content: string
  if (existing) {
    const existingEnv = dotenv.parse(existing)
    for (const [key, value] of Object.entries(secrets)) {
      existingEnv[key] = value
    }
    content = createDotEnvContent(existingEnv)
  } else {
    content = createDotEnvContent(secrets)
  }
  try {
    await fs.writeFile(filename, content, 'utf-8')
  } catch (cause) {
    throw new Error(`Unable to write secrets to ${filename}`, { cause })
  }
}
