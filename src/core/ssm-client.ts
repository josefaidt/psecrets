import { SSMClient } from '@aws-sdk/client-ssm'

const region = process.env.AWS_REGION || 'us-east-1'

export function createSsmClient() {
  // console.debug('using AWS_PROFILE', process.env.AWS_PROFILE || 'default')
  // console.debug('using AWS_REGION', region)
  return new SSMClient({ region })
}

export const client = createSsmClient()
