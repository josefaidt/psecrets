import { EOL } from 'node:os'
import { program } from 'commander'
import inquirer from 'inquirer'
import kleur from 'kleur'
import {
  downloadSecrets,
  getSecret,
  getSecrets,
  setSecret,
  removeSecret,
  uploadSecrets,
} from 'psecrets-core'
import { project } from './project.js'

export function createProgram() {
  program
    .name('psecrets')
    .description('Manage secrets from AWS SSM Parameter Store')
    .version(process.env.PACKAGE_VERSION)

  program
    .command('get')
    .description('Get secrets')
    .argument('<name>', 'Name of the secret')
    .action(async (name) => {
      const value = await getSecret(project, name)
      if (!value) {
        console.error(kleur.red(`Secret ${name} not found`))
      } else {
        console.log(value)
      }
    })

  program
    .command('set')
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
        // console.error(error)
        console.error(kleur.red(`Unable to set secret ${name}`))
      }
    })

  program
    .command('remove')
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
      }
    })

  program
    .command('list')
    .description('List secrets')
    .action(async () => {
      let secrets: any[] = []
      try {
        secrets = Object.keys(await getSecrets(project))
      } catch (error) {
        console.error(kleur.red(`No secrets found for ${project.name}`))
      }
      console.log(secrets.join(EOL))
    })

  program
    .command('download')
    .description('download secrets into a dotenv file')
    .argument('[file]', 'dotenv file to download', '.env')
    .action(async (file) => {
      try {
        await downloadSecrets(project, {
          filename: file,
        })
        console.log(`Downloaded successfully to ${file}`)
      } catch (error) {
        console.error(kleur.red(`Unable to download secrets`))
      }
    })

  program
    .command('upload')
    .description('upload secrets from a dotenv file')
    .action(async () => {
      try {
        await uploadSecrets(project)
        console.log('Uploaded successfully')
      } catch (error) {
        console.error(kleur.red(`Unable to upload secrets`))
      }
    })

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

  return program
}

export function run(argv = process.argv) {
  const program = createProgram()
  program.parse(argv)
  return program
}
