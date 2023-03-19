import kleur from 'kleur'
import { downloadSecrets } from 'psecrets-core'
import { createProjectCommand } from '../create-project-command.js'
import { createProject } from '../project.js'

export const command = createProjectCommand('download')
  .alias('dl')
  .description('download secrets into a dotenv file')
  .argument('[file]', 'dotenv file to download', '.env')
  .action(async (file, options, command) => {
    const project = await createProject({
      env: options.env,
      name: options.name,
    })
    try {
      await downloadSecrets(project, {
        filename: file,
      })
      console.log(`Downloaded successfully to ${file}`)
    } catch (error) {
      console.error(kleur.red(`Unable to download secrets`))
    }
  })
