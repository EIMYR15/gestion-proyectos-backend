import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class TypeDocument extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'abreviation' })
  declare abbreviation: string

  @column({ columnName: 'title' })
  declare title: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'typeDocumentId',
  })
  declare users: HasMany<typeof User>
}
