import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/User'
import Status from '#models/Status'
import HistoryStatus from '#models/HistoryStatus'
import Task from '#models/Task'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'title' })
  declare title: string

  @column({ columnName: 'description' })
  declare description: string

  @column()
  declare userId: number

  @column()
  declare statusId: number

  @column()
  declare clientId: number

  @column({ columnName: 'start_date' })
  declare startDate: Date

  @column({ columnName: 'end_date' })
  declare endDate: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relation with the user who created the project
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  // Relation with the status of the project
  @belongsTo(() => Status, {
    foreignKey: 'statusId',
  })
  declare status: BelongsTo<typeof Status>

  // Relation with the client of the project
  @belongsTo(() => User, {
    foreignKey: 'clientId',
  })
  declare client: BelongsTo<typeof User>

  // Relation with history statuses
  @hasMany(() => HistoryStatus, {
    foreignKey: 'entityId',
    onQuery: (query) => query.where('entity_type', 'Project'),
  })
  declare historyStatuses: HasMany<typeof HistoryStatus>

  // Relation with tasks
  @hasMany(() => Task, {
    foreignKey: 'projectId',
  })
  declare tasks: HasMany<typeof Task>
}