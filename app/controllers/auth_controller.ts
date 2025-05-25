import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'


export default class AuthController {
  // Login de usuario
  public async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('api').createToken(user)
    return response.ok({ user, token })
  }
}
