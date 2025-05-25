import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'


export default class City extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'title' })
  declare title: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
