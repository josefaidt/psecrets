import { z } from 'zod'

const inputs = {
  name: z.string().min(1),
  alias: z.array(z.string().min(1)),
  description: z.string(),
  required: z.boolean().default(false),
  defaultValue: z.any(),
}

namespace inputs {
  export type name = z.infer<typeof inputs.name>
  export type alias = z.infer<typeof inputs.alias>
  export type description = z.infer<typeof inputs.description>
  export type required = z.infer<typeof inputs.required>
  export type defaultValue = z.infer<typeof inputs.defaultValue>
}

const schema = z.object({
  ...inputs,
  defaultValue: inputs.defaultValue,
})

export type Option = z.infer<typeof schema>
export type OptionBuilder = {
  description: (value: inputs.description) => OptionBuilder
  required: (value: inputs.required) => OptionBuilder
  default: (value: inputs.defaultValue) => OptionBuilder
  build: () => Option
}

export function createOption(name: string): OptionBuilder {
  let description: z.infer<typeof inputs.description>
  let required: z.infer<typeof inputs.required>
  let defaultValue: z.infer<typeof inputs.defaultValue>

  return {
    description: function (value: inputs.description) {
      description = value
      return this
    },
    required: function (value: inputs.required) {
      required = value
      return this
    },
    default: function (value: inputs.defaultValue) {
      defaultValue = value
      return this
    },
    build: function () {
      return schema.parse({
        name,
        description,
        required,
        defaultValue,
      })
    },
  }
}
