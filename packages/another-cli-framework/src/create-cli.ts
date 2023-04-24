import { z } from 'zod'
import { parse } from './parse.js'
import type { Command, CommandBuilder } from './create-command.js'

const inputs = {
  name: z.string().min(1),
  description: z.string().optional(),
  version: z.string().optional(),
}

namespace inputs {
  export type name = z.infer<typeof inputs.name>
  export type description = z.infer<typeof inputs.description>
  export type version = z.infer<typeof inputs.version>
}

const schema = z.object({
  ...inputs,
})

export type CLI = z.infer<typeof schema>
export type CLIBuilder = {
  addCommand: (command: CommandBuilder) => CLIBuilder
  description: (value: inputs.description) => CLIBuilder
  parse: (argv: string[]) => void
  version: (value: inputs.version) => CLIBuilder
}

/**
 * Create a CLI
 */
export function createCLI(name: string): CLIBuilder {
  let description: inputs.description
  let version: inputs.version

  /**
   * CLI command bank
   */
  const bank = new Map<string, Command>()

  function build() {
    return schema.parse({
      name,
      description,
      version,
    })
  }

  function help(cli: CLI, commands: Map<string, Command> = bank) {
    console.log(`${cli.name} ${cli.version ?? ''}`)
    console.log(cli.description ?? '')
    console.log('')

    for (const command of commands.values()) {
      console.log(`${command.name} ${command.description ?? ''}`)
    }
  }

  function run(command: string, args: Record<string, any>) {
    console.debug('running command', command, args)
    const found = bank.get(command)
    console.log('got cmd', found)
    found?.handler(args)
  }

  return {
    /**
     * Add a command
     * commands will be validated on add
     */
    addCommand: function (command: CommandBuilder) {
      console.debug('adding command', command.name)
      const cmd = command.build()
      bank.set(cmd.name, cmd)
      return this
    },
    description: function (value: inputs.description) {
      description = inputs.description.parse(value)
      return this
    },
    /**
     * Parse and run the CLI
     */
    parse: function (argv?: string[]) {
      const cli = build()
      const { command, options } = parse(argv || process.argv.slice(2))
      if (!command || command === 'help') {
        help(cli)
        return
      } else {
        run(command, options)
      }
    },
    version: function (value: inputs.version) {
      version = inputs.version.parse(value)
      return this
    },
  }
}
