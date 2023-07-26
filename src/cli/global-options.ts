import { z } from 'zod'
import { ProjectSchema } from '@/support/Project.js'

/**
 * @todo all of this
 */
export const GlobalOptions = z
  .object({
    debug: z.boolean().default(false),
  })
  .merge(ProjectSchema)

export type GlobalOptions = z.infer<typeof GlobalOptions>
