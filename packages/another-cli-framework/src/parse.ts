import { z } from 'zod'

const inputs = {
  shorthand: z.string().startsWith('-').min(2),
  longhand: z.string().startsWith('--').min(3),
}

const option = inputs.shorthand.or(inputs.longhand)
type OptionMap = Record<string, any>

const argument = z.string()

type Parsed = {
  args: string[]
  command: string
  options: OptionMap
}

export function parse(argv: string[]): Parsed {
  const result: Parsed = {
    args: [],
    command: '', // @todo be more strict
    options: {},
  }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    const next = argv[i + 1]
    if (option.safeParse(arg)?.success) {
      const key = arg.replace(/^-+/, '')
      result.options[key] = next
      i++
    } else if (argument.safeParse(arg)?.success) {
      result.command = arg
      result.args = [...result.args, arg]
    }
  }
  return result
}
