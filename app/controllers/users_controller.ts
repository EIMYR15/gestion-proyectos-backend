import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/User'
import { createUserValidator, updateUserValidator } from '#validators/user'

export default class UsersController {
  // Obtener todos los usuarios (con filtros)
  async index({ request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(",").map((r: string) => r.trim()).filter(Boolean)
    const search = (request.input('search') || '').trim().toLowerCase()
    const role = request.input('role') // Puede ser el id o el nombre del rol
    const page = Number(request.input('page')) || 1
    const perPage = Number(request.input('per_page')) || 10

    const query = User.query()

    // Filtro por palabra clave (nombre, apellido, email, username, documento, teléfono)
    if (search) {
      query.where((q) => {
        q
          .whereRaw('LOWER(first_name) LIKE ?', [`%${search}%`])
          .orWhereRaw('LOWER(last_name) LIKE ?', [`%${search}%`])
          .orWhereRaw('LOWER(email) LIKE ?', [`%${search}%`])
          .orWhereRaw('LOWER(username) LIKE ?', [`%${search}%`])
          .orWhereRaw('CAST(document AS TEXT) LIKE ?', [`%${search}%`])
          .orWhereRaw('CAST(telephone AS TEXT) LIKE ?', [`%${search}%`])
      })
    }

    // Filtro por rol (por id)
    if (role) {
      query.whereHas('roles', (roleQuery) => {
        // Si envías el id del rol
        roleQuery.where('title', role)  
        // Si quieres buscar por nombre de rol, usa: roleQuery.where('title', role)
      })
    }

    // Relaciones
    if (withRelations.includes('roles')) query.preload('roles')
    if (withRelations.includes('typeDocument')) query.preload('typeDocument')
    if (withRelations.includes('city')) query.preload('city')

    // Paginación
    if (request.input('page') || request.input('per_page')) {
      const users = await query.paginate(page, perPage)
      return response.ok(users)
    } else {
      const users = await query
      return response.ok(users)
    }
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
