import type { HttpContext } from '@adonisjs/core/http'
import {PERMISSIONS} from '../../config/permissions.js'

export default class AppController {
  public async getPermissions({ response }: HttpContext) {
    return response.ok(PERMISSIONS)
  }
}
