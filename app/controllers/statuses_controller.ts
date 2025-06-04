import type { HttpContext } from '@adonisjs/core/http'
import Status from '#models/Status'

export default class StatusesController {
  // Get all statuses
  async index({ response }: HttpContext) {
    const statuses = await Status.all()
    return response.ok(statuses)
  }

  // Create a new status
  async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'description', 'type'])
    const status = await Status.create(data)
    return response.created(status)
  }

  // Get a single status by ID
  async show({ params, response }: HttpContext) {
    const status = await Status.find(params.id)
    if (!status) {
      return response.notFound({ message: 'Status not found' })
    }
    return response.ok(status)
  }

  // Update a status by ID
  async update({ params, request, response }: HttpContext) {
    const status = await Status.find(params.id)
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
    const status = await Status.find(params.id)
    if (!status) {
      return response.notFound({ message: 'Status not found' })
    }

    await status.delete()
    return response.ok({ message: 'Status deleted successfully' })
  }
}
