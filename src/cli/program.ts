import { program as Program } from '@commander-js/extra-typings'
import kleur from 'kleur'
import { project } from './project.js'
import { loadConfig } from './load-config.js'
import * as download from './commands/download.js'
import * as get from './commands/get.js'
import * as list from './commands/list.js'
import * as remove from './commands/remove.js'
import * as set from './commands/set.js'
import * as upload from './commands/upload.js'

const commands = [download, get, list, remove, set, upload].map(
  ({ command }) => command
)

export function createProgram() {
  const config = loadConfig()
  console.debug('config', JSON.stringify(config, null, 2))
  console.debug(kleur.cyan(`project: ${project.name}`))

  Program.name('psecrets')
    .description('manage secrets from AWS SSM Parameter Store')
    .option('-d, --debug', 'enable debug mode')
    .configureOutput({
      writeOut: (str) => process.stdout.write(str),
      writeErr: (str) => process.stderr.write(str),
      outputError: (str, write) => write(kleur.red(str)),
    })

  console.debug(kleur.cyan(`commands preparing`))
  for (const command of commands) {
    Program.addCommand(command)
    console.debug('\tadded command', command.name())
  }
  console.debug(kleur.cyan(`commands ready`))

  // program
  //   .command('config')
  //   .description('Configure sssecrets')
  //   .command('get')
  //   .description('Get a configuration setting')
  //   .argument('<setting>')
  //   .action(async (setting) => {
  //     console.log(`Getting ${setting}`)
  //     // console.log(config.get(setting))
  //   })
  //   .command('set')
  //   .description('Set a configuration setting')
  //   .argument('<setting>')
  //   .argument('<value>')
  //   .action(async (setting, value) => {
  //     console.log(`Setting ${setting} to ${value}`)
  //     // config.set(setting, value)
  //   })

  return Program
}

export const program = createProgram()
