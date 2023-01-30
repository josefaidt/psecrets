import type { Project } from 'project'

export type SSMParameterKeyPrefixIsh = `/app/${string}/${string}`
export type PublicKeyPrefixIsh = `/app/${string}/${string}/public`
export type PublicKeyIsh = `/app/${string}/${string}/public/${string}`
export type SecretKeyPrefixIsh = `/app/${string}/${string}/secret`
export type SecretKeyIsh = `/app/${string}/${string}/secret/${string}`

/**
 * Create SSM Parameter Store key prefix
 * useful for getting all parameters for a project
 */
export function createSSMParameterKeyPrefix(
  project: Project
): SSMParameterKeyPrefixIsh {
  return `/app/${project.name}/${project.env}`
}

/**
 * Create secret key prefix
 */
export function createSecretKeyPrefix(project: Project): SecretKeyPrefixIsh {
  return `${createSSMParameterKeyPrefix(project)}/secret`
}

/**
 * Create public key prefix
 */
export function createPublicKeyPrefix(project: Project): PublicKeyPrefixIsh {
  return `${createSSMParameterKeyPrefix(project)}/public`
}

/**
 * Create public key for project
 */
export function createPublicKey(project: Project, publicName: string): PublicKeyIsh {
  return `${createPublicKeyPrefix(project)}/${publicName}`
}

/**
 * Create secret key for project
 */
export function createSecretKey(
  project: Project,
  secretName: string
): SecretKeyIsh {
  return `${createSecretKeyPrefix(project)}/${secretName}`
}
