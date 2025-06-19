import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/User'

export default class AuthController {
  // Login de usuario
  public async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    // Cargar relaciones antes de serializar
    await user.load('typeDocument')
    await user.load('city')

    const token = await auth.use('api').createToken(user)
    const userData = user.serialize()

    // Agregar títulos desde relaciones cargadas
    userData.allowedPermissions = await user.getAllowedPermissions()
    userData.typeDocumentTitle = user.typeDocument?.title || 'Sin tipo'
    userData.cityTitle = user.city?.title || 'Sin ciudad'

    return response.ok({ user: userData, token })
  }

  // Obtener datos del usuario autenticado
  public async me({ response, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ message: 'Unauthorized' })
    }

    await user.load('typeDocument')
    await user.load('city')

    const userData = user.serialize()
    userData.allowedPermissions = await user.getAllowedPermissions()
    userData.typeDocumentTitle = user.typeDocument?.title || 'Sin tipo'
    userData.cityTitle = user.city?.title || 'Sin ciudad'

    return response.ok(userData)
  }
}
