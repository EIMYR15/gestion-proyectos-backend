import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/Comment'

export default class CommentsController {
  // Get all comments
  async index({ request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const query = Comment .query()
    if (withRelations.includes('user')) query.preload('user')
    if (withRelations.includes('task')) query.preload('task')
    const comments = await query
    return response.ok(comments)
  }

  // Create a new comment
  async store({ request, response }: HttpContext) {
    const data = request.only(['userId', 'taskId', 'description'])
    const comment = await Comment .create(data)
    return response.created(comment)
  }

  // Get a single comment by ID
  async show({ params, request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const query = Comment .query().where('id', params.id)
    if (withRelations.includes('user')) query.preload('user')
    if (withRelations.includes('task')) query.preload('task')
    const comment = await query.first()
    if (!comment) {
      return response.notFound({ message: 'Comment not found' })
    }
    return response.ok(comment)
  }

  // Update a comment by ID
  async update({ params, request, response }: HttpContext) {
    const comment = await Comment .find(params.id)
    if (!comment) {
      return response.notFound({ message: 'Comment not found' })
    }

    const data = request.only(['userId', 'taskId', 'description'])
    comment.merge(data)
    await comment.save()

    return response.ok(comment)
  }

  // Delete a comment by ID
  async destroy({ params, response }: HttpContext) {
    const comment = await Comment .find(params.id)
    if (!comment) {
      return response.notFound({ message: 'Comment not found' })
    }

    await comment.delete()
    return response.ok({ message: 'Comment deleted successfully' })
  }
}
