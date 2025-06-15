import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Priority from '#models/Priority'

export default class PrioritySeeder extends BaseSeeder {
  public async run() {
    await Priority.createMany([
      { title: 'Alta', description: 'Prioridad alta', type: 'task' },
      { title: 'Media', description: 'Prioridad media', type: 'task' },
      { title: 'Baja', description: 'Prioridad baja', type: 'task' },
      { title: 'Alta', description: 'Prioridad alta', type: 'project' },
      { title: 'Media', description: 'Prioridad media', type: 'project' },
      { title: 'Baja', description: 'Prioridad baja', type: 'project' },
    ])
  }
}
