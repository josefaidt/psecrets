import { Command } from '@commander-js/extra-typings'

export function createCommand(name: string): Command {
  return new Command(name)
}
