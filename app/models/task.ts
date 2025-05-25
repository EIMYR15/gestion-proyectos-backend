import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Status from '#models/Status'
import User from '#models/User'
import Priority from '#models/Priority'
import Project from '#models/Project'
import Comment from '#models/Comment'
import { DateTime } from 'luxon'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'title' })
  declare title: string

  @column({ columnName: 'description' })
  declare description: string

  @column()
  declare projectId: number

  @column()
  declare userId: number

  @column()
  declare priorityId: number

  @column()
  declare statusId: number

  @column({ columnName: 'due_date' })
  declare dueDate: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relation with Project
  @belongsTo(() => Project, {
    foreignKey: 'projectId',
  })
  declare project: BelongsTo<typeof Project>

  // Relation with User
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  // Relation with Priority
  @belongsTo(() => Priority, {
    foreignKey: 'priorityId',
  })
  declare priority: BelongsTo<typeof Priority>

  // Relation with Status
  @belongsTo(() => Status, {
    foreignKey: 'statusId',
  })
  declare status: BelongsTo<typeof Status>

  // Relation with Comments
  @hasMany(() => Comment, {
    foreignKey: 'taskId',
  })
  declare comments: HasMany<typeof Comment>
}