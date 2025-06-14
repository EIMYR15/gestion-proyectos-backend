import type { HttpContext } from '@adonisjs/core/http'
import City from '#models/City'
import { createCityValidator, updateCityValidator } from '#validators/city'

export default class CitiesController {
  // Listar todas las ciudades
  public async index({ request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const page = Number(request.input('page')) || 1
    const perPage = Number(request.input('per_page')) || 10
    const search = request.input('search', '').trim()

    const query = City.query()

    if (search) {
      query.where('title', 'like', `%${search}%`)
    }

    if (withRelations.includes('users')) {
      query.preload('users' as any)
    }

    // Si viene paginación, usar paginate
    if (request.input('page') || request.input('per_page')) {
      const ciudades = await query.paginate(page, perPage)
      return response.ok(ciudades)
    } else {
      const ciudades = await query
      return response.ok(ciudades)
    }
  }

  // Crear una nueva ciudad (validando datos)
  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCityValidator)
    const ciudad = await City.create(payload)
    return response.created(ciudad)
  }

  // Mostrar una ciudad por ID
  public async show({ params, request, response }: HttpContext) {
    const withRelations = (request.input('with') || '').split(',').map((r: string) => r.trim()).filter(Boolean)
    const query = City.query().where('id', params.id)
    if (withRelations.includes('users')) query.preload('users' as any)
    const ciudadResult = await query.first()
    if (!ciudadResult) {
      return response.notFound({ message: 'Ciudad no encontrada' })
    }
    return response.ok(ciudadResult)
  }

  // Actualizar una ciudad por ID (validando datos)
  public async update({ params, request, response }: HttpContext) {
    const ciudad = await City.find(params.id)
    if (!ciudad) {
      return response.notFound({ message: 'Ciudad no encontrada' })
    }
    const payload = await request.validateUsing(updateCityValidator)
    ciudad.merge(payload)
    await ciudad.save()
    return response.ok(ciudad)
  }

  // Eliminar una ciudad por ID
  public async destroy({ params, response }: HttpContext) {
    const ciudad = await City.find(params.id)
    if (!ciudad) {
      return response.notFound({ message: 'Ciudad no encontrada' })
    }
    await ciudad.delete()
    return response.ok({ message: 'Ciudad eliminada correctamente' })
  }
}
