import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Status from '#models/Status'

export default class StatusSeeder extends BaseSeeder {
  public async run() {
    await Status.createMany([
      // Estados para tareas (type: 'task')
      { title: 'To-Do', description: 'Task is open', type: 'task' },
      { title: 'In Progress', description: 'Task is in progress', type: 'task' },
      { title: 'Review', description: 'Task is under review', type: 'task' },
      { title: 'Complete', description: 'Task is closed', type: 'task' },

      // Estados para proyectos (type: 'project')
      { title: 'Active', description: 'Project is active', type: 'project' },
      { title: 'In Progress', description: 'Project is paused', type: 'project' },
      { title: 'Completed', description: 'Project is completed', type: 'project' },
      { title: 'Archived', description: 'Project is archived', type: 'project' },
      { title: 'Cancelled', description: 'Project is cancelled', type: 'project' },
    ])
  }
}
