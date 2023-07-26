import { getParameter } from '@/core/get-parameter.js'
import {
  SSMClient,
  GetParameterCommand,
  ParameterNotFound,
} from '@aws-sdk/client-ssm'
import { mockClient } from 'aws-sdk-client-mock'

describe('getParameter', () => {
  it('should return undefined if parameter does not exist', async () => {
    const mock = mockClient(SSMClient)
    mock.on(GetParameterCommand).rejects(
      new ParameterNotFound({
        $metadata: {},
        message: 'Parameter not found',
      })
    )
    const parameter = await getParameter('test')
    expect(parameter).toBeUndefined()
  })

  it('should return the parameter', async () => {
    const mock = mockClient(SSMClient)
    mock.on(GetParameterCommand).resolves({
      $metadata: {},
      Parameter: {
        Name: 'test',
        Type: 'String',
        Value: 'test value',
        Version: 1,
        LastModifiedDate: new Date(),
        ARN: 'arn:aws:ssm:us-east-1:123456789012:parameter/test',
      },
    })
    const parameter = await getParameter('test')
    expect(parameter?.Value).toEqual('test value')
  })
})
