import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.ok(users)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['firstName', 'lastName', 'telephone', 'email', 'password'])

    const user = await User.create({
      ...data,
      password: await hash.make(data.password),
    })

    return response.created(user)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    return response.ok(user)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    const data = request.only(['firstName', 'lastName', 'telephone', 'email', 'password'])

    user.merge({
      ...data,
      ...(data.password ? { password: await hash.make(data.password) } : {}),
    })

    await user.save()

    return response.ok(user)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    await user.delete()
    return response.noContent()
  }
}
