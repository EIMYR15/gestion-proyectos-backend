import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RoleUsers from '#models/RoleUsers'

export default class RoleUserSeeder extends BaseSeeder {
  public async run() {
    await RoleUsers.createMany([
      { userId: 1, roleId: 1 },
      { userId: 2, roleId: 2 },
    ])
  }
}