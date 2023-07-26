import { run } from './helpers/run.js'

describe('CLI --name', () => {
  it('should overwrite loaded project name', async () => {
    const output = await run(['list', '--name', 'doesnotexist'])
    expect(output).toEqual(
      'No secrets found for project "doesnotexist" and environment "development"'
    )
  })
})
