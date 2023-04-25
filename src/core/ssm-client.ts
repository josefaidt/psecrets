import { SSMClient } from '@aws-sdk/client-ssm'

const REGION = process.env.AWS_REGION || 'us-east-1'

export const client = new SSMClient({ region: REGION })
