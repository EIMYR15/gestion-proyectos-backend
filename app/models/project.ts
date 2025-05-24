import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Statu from '#models/statu'
import HistoryStatu from '#models/history_statu'
import Task from './task.js'

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
  declare statuId: number

  @column()
  declare clientId: number

  @column({ columnName: 'startDate' })
  declare startDate: Date

  @column({ columnName: 'endDate' })
  declare endDate: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'userId',
  })
  declare users: HasMany<typeof User>

  @hasMany(() => Statu, {
    foreignKey: 'statuId',
  })
  declare status: HasMany<typeof Statu>

  @hasMany(() => User, {
    foreignKey: 'clientId',
  })
  declare clients: HasMany<typeof User>

  @manyToMany(() => HistoryStatu, {
    pivotTable: 'history_statu',
    localKey: 'id',
    pivotForeignKey: 'projectId',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'statuId',
  })
  declare historyStatus: ManyToMany<typeof HistoryStatu>

  @manyToMany(() => Task, {
    pivotTable: 'task',
    localKey: 'id',
  })
  declare tasks: ManyToMany<typeof Task>
}
