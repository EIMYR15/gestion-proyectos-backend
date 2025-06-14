import type { HttpContext } from '@adonisjs/core/http'
import Status from '#models/Status'
import { createStatusValidator, updateStatusValidator } from '#validators/status'

export default class StatusesController {
  // Get all statuses with optional filter by type
  async index({ request, response }: HttpContext) {
    const type = request.input('type')
    let query = Status.query()
    if (type) {
      query = query.where('type', type)
    }
    const statuses = await query
    return response.ok(statuses)
  }

  // Create a new status
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createStatusValidator)
    const status = await Status.create(payload)
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
    const payload = await request.validateUsing(updateStatusValidator)
    status.merge(payload)
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
