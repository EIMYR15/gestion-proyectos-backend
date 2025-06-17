import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/Role'
import { createRoleValidator, updateRoleValidator } from '#validators/role'

export default class RolesController {
  // Get all roles con filtros y paginación
  async index({ request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const title = (request.input('title') || '').trim().toLowerCase()
    const search = (request.input('search') || '').trim().toLowerCase()
    const page = Number(request.input('page')) || 1
    const perPage = Number(request.input('per_page')) || 10

    const query = Role.query()

    // Filtro por título (parcial, insensible a mayúsculas/minúsculas)
    if (title) {
      query.whereRaw('LOWER(title) LIKE ?', [`%${title}%`])
    }

    // Filtro global por palabra clave (en title, description, permissions)
    if (search) {
      query.where((q) => {
        q
          .whereRaw('LOWER(title) LIKE ?', [`%${search}%`])
          .orWhereRaw('LOWER(description) LIKE ?', [`%${search}%`])
          .orWhereRaw('LOWER(permissions) LIKE ?', [`%${search}%`])
      })
    }

    // Relaciones
    if (withRelations.includes('users')) query.preload('users')

    // Paginación
    if (request.input('page') || request.input('per_page')) {
      const roles = await query.paginate(page, perPage)
      return response.ok(roles)
    } else {
      const roles = await query
      return response.ok(roles)
    }
  }

  // Create a new role
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createRoleValidator)
    const role = await Role.create(payload)
    return response.created(role)
  }

  // Get a single role by ID
  async show({ params, request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const query = Role.query().where('id', params.id)
    if (withRelations.includes('users')) query.preload('users')
    const role = await query.first()
    if (!role) {
      return response.notFound({ message: 'Role not found' })
    }
    return response.ok(role)
  }

  // Update a role by ID
  async update({ params, request, response }: HttpContext) {
    const role = await Role.find(params.id)
    if (!role) {
      return response.notFound({ message: 'Role not found' })
    }
    const payload = await request.validateUsing(updateRoleValidator)
    role.merge(payload)
    await role.save()
    return response.ok(role)
  }

  // Delete a role by ID
  async destroy({ params, response }: HttpContext) {
    const role = await Role.find(params.id)
    if (!role) {
      return response.notFound({ message: 'Role not found' })
    }
    await role.delete()
    return response.ok({ message: 'Role deleted successfully' })
  }
}
