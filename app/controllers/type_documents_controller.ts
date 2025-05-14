import type { HttpContext } from '@adonisjs/core/http'
import TypeDocument from '#models/type_document'

export default class TypeDocumentsController {
  // Get all type documents
  async index({ response }: HttpContext) {
    const documents = await TypeDocument.all()
    return response.ok(documents)
  }

  // Create a new type document
  async store({ request, response }: HttpContext) {
    const data = request.only(['abreviation', 'name'])
    const document = await TypeDocument.create(data)
    return response.created(document)
  }

  // Get a single type document by ID
  async show({ params, response }: HttpContext) {
    const document = await TypeDocument.find(params.id)
    if (!document) {
      return response.notFound({ message: 'Type document not found' })
    }
    return response.ok(document)
  }

  // Update a type document by ID
  async update({ params, request, response }: HttpContext) {
    const document = await TypeDocument.find(params.id)
    if (!document) {
      return response.notFound({ message: 'Type document not found' })
    }

    const data = request.only(['abreviation', 'name'])
    document.merge(data)
    await document.save()

    return response.ok(document)
  }

  // Delete a type document by ID
  async destroy({ params, response }: HttpContext) {
    const document = await TypeDocument.find(params.id)
    if (!document) {
      return response.notFound({ message: 'Type document not found' })
    }

    await document.delete()
    return response.ok({ message: 'Type document deleted successfully' })
  }
}
