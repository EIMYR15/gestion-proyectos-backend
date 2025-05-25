import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/User'
import Hash from '@adonisjs/core/services/hash'

export default class AuthController {
    /**
     * Login a user and return a token
     */
    async login({ request, auth, response }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
        const user = await User.verifyCredentials(email, password)
        const token = await auth.use('api').createToken(user)
        return response.ok({ user, token })
    }

    /**
     * Reset password for a user
     */
    async resetPassword({ request, response }: HttpContext) {
        const { email, newPassword } = request.only(['email', 'newPassword'])

        // Find user by email
        const user = await User.query().where('email', email).first()
        if (!user) {
            return response.notFound({ message: 'User not found' })
        }

        // Update password
        user.password = await Hash.make(newPassword)
        await user.save()

        return response.ok({ message: 'Password reset successfully' })
    }
}