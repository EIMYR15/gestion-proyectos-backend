import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Role from '#models/role'

export default class RoleUser extends BaseModel {
  public static table = 'role_user'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare roleId: number

  @hasMany(() => User, {
    foreignKey: 'userId',
  })
  declare users: HasMany<typeof User>

  @hasMany(() => Role, {
    foreignKey: 'roleId',
  })
  declare roles: HasMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
