import type { HttpContext } from '@adonisjs/core/http'
import Prioridad from '#models/Priority'

export default class PrioritiesController {
  // Get all priorities
  async index({ response }: HttpContext) {
    const priorities = await Prioridad.all()
    return response.ok(priorities)
  }

  // Create a new priority
  async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'description', 'type'])
    const priority = await Prioridad.create(data)
    return response.created(priority)
  }

  // Get a single priority by ID
  async show({ params, response }: HttpContext) {
    const priority = await Prioridad.find(params.id)
    if (!priority) {
      return response.notFound({ message: 'Priority not found' })
    }
    return response.ok(priority)
  }

  // Update a priority by ID
  async update({ params, request, response }: HttpContext) {
    const priority = await Prioridad.find(params.id)
    if (!priority) {
      return response.notFound({ message: 'Priority not found' })
    }

    const data = request.only(['title', 'description', 'type'])
    priority.merge(data)
    await priority.save()

    return response.ok(priority)
  }

  // Delete a priority by ID
  async destroy({ params, response }: HttpContext) {
    const priority = await Prioridad.find(params.id)
    if (!priority) {
      return response.notFound({ message: 'Priority not found' })
    }

    await priority.delete()
    return response.ok({ message: 'Priority deleted successfully' })
  }
}
