import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    await Role.createMany([
      { title: 'Admin', description: 'Administrator role', permissions: 'ALL' },
      { title: 'User', description: 'Regular user role', permissions: 'READ_ONLY' },
    ])
  }
}