import { Project, createProject, defineProject } from '../src/Project.js'

const sample = {
  name: 'my-project',
  env: 'dev',
}

describe('project', () => {
  it('should create a new project with `new`', () => {
    const project = new Project(sample)
    expect(project.name).toEqual(sample.name)
    expect(project.env).toEqual(sample.env)
  })

  it('should create a new project with create*', () => {
    const project = createProject(sample)
    expect(project.name).toEqual(sample.name)
    expect(project.env).toEqual(sample.env)
  })

  it('should create a new project with define*', () => {
    const project = defineProject(sample)
    expect(project.name).toEqual(sample.name)
    expect(project.env).toEqual(sample.env)
  })
})
