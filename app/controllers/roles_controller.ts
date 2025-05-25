import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/Role'

export default class RolesController {
  // Get all roles
  async index({ response }: HttpContext) {
    const roles = await Role.all()
    return response.ok(roles)
  }

  // Create a new role
  async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'description', 'permissions'])
    const role = await Role.create(data)
    return response.created(role)
  }

  // Get a single role by ID
  async show({ params, response }: HttpContext) {
    const role = await Role.find(params.id)
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

    const data = request.only(['title', 'description', 'permissions'])
    role.merge(data)
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
