import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class TypeDocument extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'abreviation' })
  declare abreviation: string

  @column({ columnName: 'name' })
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
