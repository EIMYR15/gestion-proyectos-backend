import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  /**
   * Obtener todos los usuarios
   */
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.ok(users)
  }

  /**
   * Crear un nuevo usuario
   */
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'typeDocumentId',
      'document',
      'firtsName',
      'lastName',
      'telephone',
      'cityId',
      'email',
      'username',
      'password',
    ])

    const user = await User.create({
      ...data,
      password: await hash.make(data.password),
    })

    return response.created(user)
  }

  /**
   * Mostrar un usuario por ID
   */
  async show({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Usuario no encontrado' })
    }
    return response.ok(user)
  }

  /**
   * Actualizar un usuario
   */
  async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Usuario no encontrado' })
    }

    const data = request.only([
      'typeDocumentId',
      'document',
      'firstName',
      'lastName',
      'telephone',
      'email',
      'username',
      'password',
    ])

    user.merge({
      ...data,
      ...(data.password ? { password: await hash.make(data.password) } : {}),
    })

    await user.save()
    return response.ok(user)
  }

  /**
   * Eliminar un usuario
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Usuario no encontrado' })
    }

    await user.delete()
    return response.noContent()
  }
}
