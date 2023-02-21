import inquirer from 'inquirer'
import kleur from 'kleur'
import { setSecret, setPublic } from 'psecrets-core'
import { createCommand } from '../create-command.js'
import { createProject } from '../project.js'

export const command = createCommand('set')
  .alias('s')
  .alias('create') // maybe change to create?
  .description('set a secret')
  .argument('<name>', 'Name of the secret')
  .argument('[value]', 'Value of the secret')
  .option('-p, --public', 'make the secret public (not encrypted)')
  .action(async (name, value, options, command) => {
    const project = await createProject(command.optsWithGlobals())
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
    if (!secretValue) {
      console.error(kleur.red('No value provided'))
      return
    }
    try {
      if (options.public) {
        await setPublic(project, name, secretValue)
      } else {
        await setSecret(project, name, secretValue)
      }
      console.log(`Set ${name} successfully`)
    } catch (error) {
      console.error(
        kleur.red(
          `Unable to set ${
            options.public ? 'public parameter' : 'secret'
          } ${name}`
        )
      )
      console.debug(error)
    }
  })
