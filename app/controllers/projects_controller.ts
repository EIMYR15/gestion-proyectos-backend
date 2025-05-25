import type { HttpContext } from '@adonisjs/core/http'
import Proyecto from '#models/Project'

export default class ProjectsController {
  // Get all projects
  async index({ response }: HttpContext) {
    const projects = await Proyecto.all()
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
  async show({ params, response }: HttpContext) {
    const project = await Proyecto.find(params.id)
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
