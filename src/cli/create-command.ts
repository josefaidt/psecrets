import { Command } from '@commander-js/extra-typings'

/**
 * Helper to create a Commander command
 * @param name command name
 */
export function createCommand(name: string): Command {
  return new Command(name)
}
