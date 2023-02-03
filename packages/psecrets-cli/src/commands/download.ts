import kleur from 'kleur'
import { downloadSecrets } from 'psecrets-core'
import { createCommand } from '../create-command.js'
import { project } from '../project.js'

export const command = createCommand('download')
  .alias('dl')
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
