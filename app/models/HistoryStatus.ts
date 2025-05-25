import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Status from '#models/Status'

export default class HistoryStatus extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare statusId: number

  @column()
  declare entityType: string // Polymorphic type (e.g., 'Task', 'Project')

  @column()
  declare entityId: number // Polymorphic ID

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relation with Status
  @belongsTo(() => Status, {
    foreignKey: 'statusId',
  })
  declare status: BelongsTo<typeof Status>
}