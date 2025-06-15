import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Priority from '#models/Priority'

export default class PrioritySeeder extends BaseSeeder {
  public async run() {
    await Priority.createMany([
      { title: 'Alta', description: 'Prioridad alta', type: 'tarea' },
      { title: 'Media', description: 'Prioridad media', type: 'tarea' },
      { title: 'Baja', description: 'Prioridad baja', type: 'tarea' },
      { title: 'Alta', description: 'Prioridad alta', type: 'proyecto' },
      { title: 'Media', description: 'Prioridad media', type: 'proyecto' },
      { title: 'Baja', description: 'Prioridad baja', type: 'proyecto' },
    ])
  }
}
