import { z } from 'zod'

export const schema = z.object({
  /**
   * Project name
   * @todo dynamic default from package.json
   */
  name: z.string().optional().default('my-project'),
  env: z.string().optional().default('development'),
})

export type ProjectOptions = z.infer<typeof schema>

export class Project {
  /**
   * Project name
   */
  public name: string
  /**
   * Current environment
   */
  public env: string

  constructor(options?: ProjectOptions) {
    const opts = schema.parse(options || {})
    this.name = opts.name
    this.env = opts.env
  }
}

export function createProject(options?: ProjectOptions): Project {
  return new Project(options)
}

export function defineProject(options?: ProjectOptions): Project {
  return new Project(options)
}
