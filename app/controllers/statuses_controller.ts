import type { HttpContext } from '@adonisjs/core/http'
import Estado from '#models/statu'

export default class StatusesController {
  // Get all statuses
  async index({ response }: HttpContext) {
    const statuses = await Estado.all()
    return response.ok(statuses)
  }

  // Create a new status
  async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'description', 'type'])
    const status = await Estado.create(data)
    return response.created(status)
  }

  // Get a single status by ID
  async show({ params, response }: HttpContext) {
    const status = await Estado.find(params.id)
    if (!status) {
      return response.notFound({ message: 'Status not found' })
    }
    return response.ok(status)
  }

  // Update a status by ID
  async update({ params, request, response }: HttpContext) {
    const status = await Estado.find(params.id)
    if (!status) {
      return response.notFound({ message: 'Status not found' })
    }

    const data = request.only(['title', 'description', 'type'])
    status.merge(data)
    await status.save()

    return response.ok(status)
  }

  // Delete a status by ID
  async destroy({ params, response }: HttpContext) {
    const status = await Estado.find(params.id)
    if (!status) {
      return response.notFound({ message: 'Status not found' })
    }

    await status.delete()
    return response.ok({ message: 'Status deleted successfully' })
  }
}
