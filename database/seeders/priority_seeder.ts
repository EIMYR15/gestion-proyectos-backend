import Priority from '#models/priority'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Priority.createMany([
      { title: 'Alta', description: 'Es critico para el cumplimiento de los objetivos estrategicos.', type: 'proyecto, tarea' },
      { title: 'Media', description: 'Es importante pero no urgente.', type: 'proyecto, tarea' },
      { title: 'Baja', description: 'No es urgente ni critica.', type: 'proyecto, tarea' },
    ])
  }
}
