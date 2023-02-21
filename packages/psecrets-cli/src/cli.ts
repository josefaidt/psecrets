import { program } from './program.js'

export function run(argv = process.argv) {
  program.parse(argv)
  return program
}
