import { run } from './helpers/run.js'

describe('CLI --env', () => {
  it('should overwrite loaded project env', async () => {
    const output = await run(['list', '--env', 'doesnotexist'])
    expect(output).toEqual(
      'No secrets found for my-project and environment doesnotexist'
    )
  })
})
