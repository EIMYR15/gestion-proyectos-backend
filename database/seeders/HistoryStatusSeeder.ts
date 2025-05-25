import { BaseSeeder } from '@adonisjs/lucid/seeders'
import HistoryStatus from '#models/HistoryStatus'

export default class HistoryStatusSeeder extends BaseSeeder {
  public async run() {
    await HistoryStatus.createMany([
      {
        statusId: 1,
        entityType: 'Task',
        entityId: 1,
      },
      {
        statusId: 2,
        entityType: 'Project',
        entityId: 1,
      },
    ])
  }
}