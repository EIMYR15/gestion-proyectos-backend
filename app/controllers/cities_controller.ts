import type { HttpContext } from '@adonisjs/core/http'
import Ciudad from '#models/city'

export default class CiudadesController {
  // Listar todas las ciudades
  public async index({ response }: HttpContext) {
    const ciudades = await Ciudad.all()
    return response.ok(ciudades)
  }

  // Crear una nueva ciudad
  public async store({ request, response }: HttpContext) {
    const data = request.only(['name'])
    const ciudad = await Ciudad.create(data)
    return response.created(ciudad)
  }

  // Mostrar una ciudad por ID
  public async show({ params, response }: HttpContext) {
    const ciudad = await Ciudad.find(params.id)
    if (!ciudad) {
      return response.notFound({ message: 'Ciudad no encontrada' })
    }
    return response.ok(ciudad)
  }

  // Actualizar una ciudad por ID
  public async update({ params, request, response }: HttpContext) {
    const ciudad = await Ciudad.find(params.id)
    if (!ciudad) {
      return response.notFound({ message: 'Ciudad no encontrada' })
    }

    const data = request.only(['name'])
    ciudad.merge(data)
    await ciudad.save()
    return response.ok(ciudad)
  }

  // Eliminar una ciudad por ID
  public async destroy({ params, response }: HttpContext) {
    const ciudad = await Ciudad.find(params.id)
    if (!ciudad) {
      return response.notFound({ message: 'Ciudad no encontrada' })
    }

    await ciudad.delete()
    return response.ok({ message: 'Ciudad eliminada correctamente' })
  }
}
