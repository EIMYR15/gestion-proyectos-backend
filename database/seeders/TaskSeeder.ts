import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Task from '#models/Task'

export default class TaskSeeder extends BaseSeeder {
  public async run() {
    await Task.createMany([
      {
        title: 'Task 1',
        description: 'Description of Task 1',
        projectId: 1,
        userId: 1,
        priorityId: 1,
        statusId: 1,
        dueDate: new Date('2025-06-15'),
      },
      {
        title: 'Task 2',
        description: 'Description of Task 2',
        projectId: 2,
        userId: 2,
        priorityId: 2,
        statusId: 2,
        dueDate: new Date('2025-07-15'),
      },
    ])
  }
}