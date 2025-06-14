import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/Task'
import { createTaskValidator, updateTaskValidator } from '#validators/task'

export default class TasksController {
  // Get all tasks
  async index({ request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const query = Task.query()
    if (withRelations.includes('project')) query.preload('project' as any)
    if (withRelations.includes('user')) query.preload('user' as any)
    if (withRelations.includes('priority')) query.preload('priority' as any)
    if (withRelations.includes('status')) query.preload('status' as any)
    if (withRelations.includes('comments')) query.preload('comments' as any)
    const tasks = await query
    return response.ok(tasks)
  }

  // Create a new task
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createTaskValidator)
    const task = await Task.create(payload)
    return response.created(task)
  }

  // Get a single task by ID
  async show({ params, request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const query = Task.query().where('id', params.id)
    if (withRelations.includes('project')) query.preload('project' as any)
    if (withRelations.includes('user')) query.preload('user' as any)
    if (withRelations.includes('priority')) query.preload('priority' as any)
    if (withRelations.includes('status')) query.preload('status' as any)
    if (withRelations.includes('comments')) query.preload('comments' as any)
    const task = await query.first()
    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }
    return response.ok(task)
  }

  // Update a task by ID
  async update({ params, request, response }: HttpContext) {
    const task = await Task.find(params.id)
    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }
    const payload = await request.validateUsing(updateTaskValidator)
    task.merge(payload)
    await task.save()
    return response.ok(task)
  }

  // Delete a task by ID
  async destroy({ params, response }: HttpContext) {
    const task = await Task.find(params.id)
    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }
    await task.delete()
    return response.ok({ message: 'Task deleted successfully' })
  }
}
