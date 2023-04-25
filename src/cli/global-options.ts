import { z } from 'zod'
import { schema as Project } from '@/support/Project.js'

/**
 * @todo all of this
 */
export const GlobalOptions = z
  .object({
    debug: z.boolean().default(false),
  })
  .merge(Project)

export type GlobalOptions = z.infer<typeof GlobalOptions>
