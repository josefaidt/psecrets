import { createCommand } from './create-command.js'
import * as env from './options/env.js'
import * as name from './options/name.js'

const options = {
  env: env.option,
  name: name.option,
}

/**
 * Creates a command with common Project options (name and env)
 * @param name command name
 */
export function createProjectCommand(name: string) {
  return createCommand(name).addOption(options.env).addOption(options.name)
}
