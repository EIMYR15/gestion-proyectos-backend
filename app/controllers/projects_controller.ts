import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/Project'
import { createProjectValidator, updateProjectValidator } from '#validators/project'

export default class ProjectsController {
  // Obtener todos los proyectos con filtro y paginación
  async index({ request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const search = (request.input('search') || '').trim().toLowerCase()
    const userId = request.input('userId') // responsable
    const page = Number(request.input('page')) || 1
    const perPage = Number(request.input('per_page')) || 10

    const query = Project.query()

    // Filtro por palabra clave (en título o descripción)
    if (search) {
      query.where((q) => {
        q
          .whereRaw('LOWER(title) LIKE ?', [`%${search}%`])
          .orWhereRaw('LOWER(description) LIKE ?', [`%${search}%`])
      })
    }

    // Filtro por responsable (userId)
    if (userId) {
      query.where('user_id', userId)
    }

    // Relaciones dinámicas
    if (withRelations.includes('user')) query.preload('user')
    if (withRelations.includes('status')) query.preload('status')
    if (withRelations.includes('client')) query.preload('client')
    if (withRelations.includes('historyStatuses')) query.preload('historyStatuses')
    if (withRelations.includes('tasks')) query.preload('tasks')

    // Paginación
    if (request.input('page') || request.input('per_page')) {
      const projects = await query.paginate(page, perPage)
      return response.ok(projects)
    } else {
      const projects = await query
      return response.ok(projects)
    }
  }

  // Create a new project
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createProjectValidator)
    const project = await Project.create(payload)
    return response.created(project)
  }

  // Get a single project by ID
  async show({ params, request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const query = Project.query().where('id', params.id)
    if (withRelations.includes('user')) query.preload('user')
    if (withRelations.includes('status')) query.preload('status')
    if (withRelations.includes('client')) query.preload('client')
    if (withRelations.includes('historyStatuses')) query.preload('historyStatuses')
    if (withRelations.includes('tasks')) query.preload('tasks')
    const project = await query.first()
    if (!project) {
      return response.notFound({ message: 'Project not found' })
    }
    return response.ok(project)
  }

  // Update a project by ID
  async update({ params, request, response }: HttpContext) {
    const project = await Project.find(params.id)
    if (!project) {
      return response.notFound({ message: 'Project not found' })
    }
    const payload = await request.validateUsing(updateProjectValidator)
    project.merge(payload)
    await project.save()
    return response.ok(project)
  }

  // Delete a project by ID
  async destroy({ params, response }: HttpContext) {
    const project = await Project.find(params.id)
    if (!project) {
      return response.notFound({ message: 'Project not found' })
    }
    await project.delete()
    return response.ok({ message: 'Project deleted successfully' })
  }
}
