import inquirer from 'inquirer'
import kleur from 'kleur'
import { removeSecret } from 'psecrets-core'
import { createCommand } from '../create-command.js'
import { project } from '../project.js'

export const command = createCommand('remove')
  .alias('rm')
  .description('remove secrets')
  .argument('<name>', 'Name of the secret')
  .option('-y, --yes', 'Skip confirmation')
  .action(async (name, options) => {
    if (!options.yes) {
      const answer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Are you sure you want to remove ${name}?`,
        },
      ])
      if (!answer.confirm) {
        return
      }
    }
    try {
      await removeSecret(project, name)
      console.log(`Removed ${name} successfully`)
    } catch (error) {
      console.error(kleur.red(`Unable to remove secret ${name}`))
      console.debug(error)
    }
  })
