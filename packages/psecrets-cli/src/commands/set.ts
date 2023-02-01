import { createCommand } from 'commander'
import inquirer from 'inquirer'
import kleur from 'kleur'
import { setSecret } from 'psecrets-core'
import { project } from '../project.js'

export const command = createCommand('set')
  .description('Set secrets')
  .argument('<name>', 'Name of the secret')
  .argument('[value]', 'Value of the secret')
  .action(async (name, value) => {
    let secretValue = value
    if (!value) {
      const answer = await inquirer.prompt([
        {
          type: 'password',
          name: 'value',
          message: 'Enter the value of the secret',
        },
      ])
      secretValue = answer.value
    }
    try {
      await setSecret(project, name, secretValue)
      console.log(`Set ${name} successfully`)
    } catch (error) {
      console.error(kleur.red(`Unable to set secret ${name}`))
      console.debug(error)
    }
  })
