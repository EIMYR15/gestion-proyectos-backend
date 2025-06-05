import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/User'

export default class UsersController {
  /**
   * Obtener todos los usuarios
   */
  async index({ request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(",").map((r: string) => r.trim()).filter(Boolean)
    const query = User.query()
    if (withRelations.includes('roles')) query.preload('roles')
    if (withRelations.includes('typeDocument')) query.preload('typeDocument')
    if (withRelations.includes('city')) query.preload('city')
    const users = await query
    return response.ok(users)
  }

  /**
   * Crear un nuevo usuario
   */
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'typeDocumentId',
      'document',
      'firstName',
      'lastName',
      'telephone',
      'cityId',
      'email',
      'username',
      'password',
    ])

    const newUser = await User.create(data)

    const roles = request.input('roles')
    if (roles && Array.isArray(roles)) {
      await newUser.related('roles').sync(roles)
    }

    return response.created(newUser)
  }

  /**
   * Mostrar un usuario por ID
   */
  async show({ params, request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const query = User.query().where('id', params.id)
    if (withRelations.includes('roles')) query.preload('roles')
    if (withRelations.includes('typeDocument')) query.preload('typeDocument')
    if (withRelations.includes('city')) query.preload('city')
    const user = await query.first()
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
      'cityId',
    ])

    user.merge(data)

    await user.save()

    const roles = request.input('roles')
    if (roles && Array.isArray(roles)) {
      await user.related('roles').sync(roles)
    }

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
