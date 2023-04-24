import { z, ZodAny } from 'zod'

const inputs = {
  name: z.string().min(1),
  alias: z.array(z.string().min(1)).optional(),
  description: z.string(),
}

namespace inputs {
  export type name = z.infer<typeof inputs.name>
  export type alias = z.infer<typeof inputs.alias>
  export type description = z.infer<typeof inputs.description>
}

const schema = z.object({
  ...inputs,
  handler: z.function().args(z.any()).returns(z.any()),
})

export type Command = z.infer<typeof schema>
export type CommandHandlerFn<T> = (args: T) => unknown
export type CommandBuilder = {
  name: inputs.name
  description: (value: inputs.description) => CommandBuilder
  alias: (value: inputs.alias) => CommandBuilder
  argument: (name: string, description: any, z: ZodAny) => CommandBuilder
  build: () => Command
  handle: (
    handlerFn: CommandHandlerFn<{ args: Map<string, any> }>
  ) => CommandBuilder
}

/**
 * Create a command
 */
export function createCommand(name: string): CommandBuilder {
  let description: inputs.name
  let alias: inputs.alias
  let args: Map<string, any> = new Map()
  let handler: CommandHandlerFn<{ args: typeof args }>

  return {
    name,
    description: function (value) {
      description = value
      return this
    },
    alias: function (value) {
      alias = value
      return this
    },
    argument: function (name: string, description: any, z: ZodAny) {
      args.set(name, { description, z })
      return this
    },
    handle: function (
      handlerFn: CommandHandlerFn<{
        args: Map<string, any>
      }>
    ) {
      handler = handlerFn
      return this
    },
    build: function () {
      return schema.parse({
        name,
        description,
        alias,
        handler,
      })
    },
  }
}
