import { loadEnv } from 'vite'
import { z } from 'zod'
import { setPublic } from './set-public.js'
import { setSecret } from './set-secret.js'
import { PREFIXES } from './constants.js'
import type { Project } from 'project'

const schema = z.object({
  prefixes: z
    .array(z.string())
    .optional()
    .default([PREFIXES.PUBLIC, PREFIXES.SECRET]),
})

export type UploadOptions = z.infer<typeof schema>

/**
 * Upload to SSM Parameter Store using a local file
 */
export async function upload(
  project: Project,
  options?: UploadOptions
): Promise<void> {
  const opts = schema.parse(options ?? {})
  const env = loadEnv(project.env, process.cwd(), opts.prefixes)
  for (const [name, value] of Object.entries(env)) {
    if (name.startsWith(PREFIXES.PUBLIC)) {
      await setPublic(project, name, value)
    } else {
      await setSecret(project, name, value)
    }
  }
}
