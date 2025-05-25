import type { HttpContext } from '@adonisjs/core/http'
import Tarea from '#models/Task'

export default class TasksController {
  // Get all tasks
  async index({ response }: HttpContext) {
    const tasks = await Tarea.all()
    return response.ok(tasks)
  }

  // Create a new task
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'title',
      'description',
      'projectId',
      'userId',
      'priorityId',
      'statuId',
      'deadline',
    ])
    const task = await Tarea.create(data)
    return response.created(task)
  }

  // Get a single task by ID
  async show({ params, response }: HttpContext) {
    const task = await Tarea.find(params.id)
    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }
    return response.ok(task)
  }

  // Update a task by ID
  async update({ params, request, response }: HttpContext) {
    const task = await Tarea.find(params.id)
    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }

    const data = request.only([
      'title',
      'description',
      'projectId',
      'userId',
      'priorityId',
      'statuId',
      'deadline',
    ])
    task.merge(data)
    await task.save()

    return response.ok(task)
  }

  // Delete a task by ID
  async destroy({ params, response }: HttpContext) {
    const task = await Tarea.find(params.id)
    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }

    await task.delete()
    return response.ok({ message: 'Task deleted successfully' })
  }
}
