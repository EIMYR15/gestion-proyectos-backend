import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Priority from '#models/Priority'

export default class PrioritySeeder extends BaseSeeder {
  public async run() {
    await Priority.createMany([
      { title: 'High', description: 'High priority', type: 'task' },
      { title: 'Medium', description: 'Medium priority', type: 'task' },
      { title: 'Low', description: 'Low priority', type: 'task' },
      { title: 'High', description: 'High priority', type: 'project' },
      { title: 'Medium', description: 'Medium priority', type: 'project' },
      { title: 'Low', description: 'Low priority', type: 'project' },
    ])
  }
}
