import type { HttpContext } from '@adonisjs/core/http'
import Proyecto from '#models/Project'

export default class ProjectsController {
  // Get all projects
  async index({ request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const query = Proyecto.query()
    if (withRelations.includes('user')) query.preload('user')
    if (withRelations.includes('status')) query.preload('status')
    if (withRelations.includes('client')) query.preload('client')
    if (withRelations.includes('historyStatuses')) query.preload('historyStatuses')
    if (withRelations.includes('tasks')) query.preload('tasks')
    const projects = await query
    return response.ok(projects)
  }

  // Create a new project
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'title',
      'description',
      'userId',
      'statuId',
      'clientId',
      'startDate',
      'endDate',
    ])
    const project = await Proyecto.create(data)
    return response.created(project)
  }

  // Get a single project by ID
  async show({ params, request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const query = Proyecto.query().where('id', params.id)
      if(withRelations.includes('user'))query.preload('user')
      if(withRelations.includes('status'))query.preload('status')
      if(withRelations.includes('client'))query.preload('client')
      if(withRelations.includes('historyStatuses'))query.preload('historyStatuses')
      if(withRelations.includes('tasks'))query.preload('tasks')
      const project = await query.first()
    if (!project) {
      return response.notFound({ message: 'Project not found' })
    }
    return response.ok(project)
  }

  // Update a project by ID
  async update({ params, request, response }: HttpContext) {
    const project = await Proyecto.find(params.id)
    if (!project) {
      return response.notFound({ message: 'Project not found' })
    }

    const data = request.only([
      'title',
      'description',
      'userId',
      'statuId',
      'clientId',
      'startDate',
      'endDate',
    ])
    project.merge(data)
    await project.save()

    return response.ok(project)
  }

  // Delete a project by ID
  async destroy({ params, response }: HttpContext) {
    const project = await Proyecto.find(params.id)
    if (!project) {
      return response.notFound({ message: 'Project not found' })
    }

    await project.delete()
    return response.ok({ message: 'Project deleted successfully' })
  }
}
