import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/User'

export default class AuthController {
  // Login de usuario
  public async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('api').createToken(user)
    const userData = user.serialize()
    userData.allowedPermissions = user.getAllowedPermissions()
    return response.ok({ user: userData, token })
  }
}
