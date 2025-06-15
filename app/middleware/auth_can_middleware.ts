import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthCanMiddleware {
  /**
   * The `handle` method receives context, next, and the required permissions.
   */
  public async handle(ctx: HttpContext, next: NextFn, permissions: string[]) {
    const auth = ctx.auth.use('api')
    await auth.check()

    if (!auth.isAuthenticated) {
      return ctx.response.unauthorized({ message: 'Unauthorized' })
    }

    const user = auth.user!
    const allowed = await user.getAllowedPermissions()

    const hasAll = permissions.every((perm) => allowed[perm])
    if (!hasAll) {
      return ctx.response.forbidden({ message: 'You do not have sufficient permissions' })
    }

    await next()
  }
}
