import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/User'
import { createUserValidator, updateUserValidator } from '#validators/user'

export default class UsersController {
  // Obtener todos los usuarios (con relaciones si se piden)
  async index({ request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(",").map((r: string) => r.trim()).filter(Boolean)
    const query = User.query()
    if (withRelations.includes('roles')) query.preload('roles')
    if (withRelations.includes('typeDocument')) query.preload('typeDocument')
    if (withRelations.includes('city')) query.preload('city')
    const users = await query
    return response.ok(users)
  }

  // Crear un nuevo usuario (validando datos)
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const newUser = await User.create(payload)
    if (payload.roles && Array.isArray(payload.roles)) {
      await newUser.related('roles').sync(payload.roles)
    }
    return response.created(newUser)
  }

  // Mostrar un usuario por ID (con relaciones si se piden)
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

  // Actualizar un usuario (validando datos)
  async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Usuario no encontrado' })
    }
    const payload = await request.validateUsing(updateUserValidator)
    user.merge(payload)
    await user.save()
    if (payload.roles && Array.isArray(payload.roles)) {
      await user.related('roles').sync(payload.roles)
    }
    return response.ok(user)
  }

  // Eliminar un usuario
  async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Usuario no encontrado' })
    }
    await user.delete()
    return response.noContent()
  }
}
