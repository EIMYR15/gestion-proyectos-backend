import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Status from '#models/Status'

export default class StatusSeeder extends BaseSeeder {
  public async run() {
    await Status.createMany([
      { title: 'Open', description: 'Task is open', type: 'task' },
      { title: 'Closed', description: 'Task is closed', type: 'task' },
    ])
  }
}