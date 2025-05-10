import type { HttpContext } from '@adonisjs/core/http'
import Comentario from '#models/comment'

export default class CommentsController {
  // Get all comments
  async index({ response }: HttpContext) {
    const comments = await Comentario.all()
    return response.ok(comments)
  }

  // Create a new comment
  async store({ request, response }: HttpContext) {
    const data = request.only(['userId', 'taskId', 'description'])
    const comment = await Comentario.create(data)
    return response.created(comment)
  }

  // Get a single comment by ID
  async show({ params, response }: HttpContext) {
    const comment = await Comentario.find(params.id)
    if (!comment) {
      return response.notFound({ message: 'Comment not found' })
    }
    return response.ok(comment)
  }

  // Update a comment by ID
  async update({ params, request, response }: HttpContext) {
    const comment = await Comentario.find(params.id)
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
    const comment = await Comentario.find(params.id)
    if (!comment) {
      return response.notFound({ message: 'Comment not found' })
    }

    await comment.delete()
    return response.ok({ message: 'Comment deleted successfully' })
  }
}
