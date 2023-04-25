import { EOL } from 'node:os'
import { run } from './helpers/run.js'

describe('CLI', () => {
  // it('should execute', async () => {
  //   const mockExit = vi
  //     .spyOn(process, 'exit')
  //     .mockImplementationOnce((number) => {
  //       throw new Error(`Exit with code ${number}`)
  //     })
  //   const output = await run([])
  //   expect(output).toThrowError(new Error('Exit with code 1'))
  //   expect(mockExit).toHaveBeenCalledWith(1)
  // })
  it('should execute', async () => {
    // prints help
    await expect(run([])).rejects.toBeTruthy()
    // expect(output.split(EOL)[0]).toEqual('Usage: psecrets <command> [options]')
  })

  const key = 'test'
  const value = 'test value'

  /**
   * @todo FIX, wrap execSync in a helper to run commands and send inputs
   */
  it('should set a variable', async () => {
    const output = await run(['set', key, value])
    expect(output).toEqual(`Set ${key} successfully`)
  })

  it('should get a variable', async () => {
    const output = await run(['get', key])
    expect(output).toEqual(value)
  })

  it('should list the variables', async () => {
    const output = await run(['list'])
    expect(output).toEqual(key)
  })

  it('should remove a variable', async () => {
    const output = await run(['remove', key, '--yes'])
    expect(output).toEqual(`Removed ${key} successfully`)
  })

  it('should upload environment variables', async () => {
    const output = await run(['upload'])
    expect(output).toEqual('Uploaded successfully')
  })

  it('should download environment variables', async () => {
    const output = await run(['download'])
    expect(output).toEqual('Downloaded successfully to .env')
  })
})
