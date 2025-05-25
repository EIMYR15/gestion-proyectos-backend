import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Priority from '#models/Priority'

export default class PrioritySeeder extends BaseSeeder {
  public async run() {
    await Priority.createMany([
      { title: 'High', description: 'High priority', type: 'task' },
      { title: 'Low', description: 'Low priority', type: 'project' },
    ])
  }
}