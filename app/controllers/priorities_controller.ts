import type { HttpContext } from '@adonisjs/core/http'
import Priority from '#models/Priority'
import { createPriorityValidator, updatePriorityValidator } from '#validators/priority'

export default class PrioritiesController {
  // Get all priorities
  async index({ response }: HttpContext) {
    const priorities = await Priority.all()
    return response.ok(priorities)
  }

  // Create a new priority
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createPriorityValidator)
    const priority = await Priority.create(payload)
    return response.created(priority)
  }

  // Get a single priority by ID
  async show({ params, response }: HttpContext) {
    const priority = await Priority.find(params.id)
    if (!priority) {
      return response.notFound({ message: 'Priority not found' })
    }
    return response.ok(priority)
  }

  // Update a priority by ID
  async update({ params, request, response }: HttpContext) {
    const priority = await Priority.find(params.id)
    if (!priority) {
      return response.notFound({ message: 'Priority not found' })
    }
    const payload = await request.validateUsing(updatePriorityValidator)
    priority.merge(payload)
    await priority.save()
    return response.ok(priority)
  }

  // Delete a priority by ID
  async destroy({ params, response }: HttpContext) {
    const priority = await Priority.find(params.id)
    if (!priority) {
      return response.notFound({ message: 'Priority not found' })
    }
    await priority.delete()
    return response.ok({ message: 'Priority deleted successfully' })
  }
}
