import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Priority from '#models/priority'
import Project from '#models/project'
import Status from '#models/statu'

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
  declare statuId: number

  @column({ columnName: 'deadline' })
  declare deadline: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Status, {
    foreignKey: 'statusId',
  })
  declare status: HasMany<typeof Status>

  @hasMany(() => User, {
    foreignKey: 'userId',
  })
  declare users: HasMany<typeof User>

  @hasMany(() => Priority, {
    foreignKey: 'priorityId',
  })
  declare priorities: HasMany<typeof Priority>

  @hasMany(() => Project, {
    foreignKey: 'projectId',
  })
  declare projects: HasMany<typeof Project>
}
