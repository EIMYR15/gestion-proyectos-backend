import Statu from '#models/statu'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Statu.createMany([
      { title: 'Pendiente', description: 'Se encuentra pendiente.', type: 'proyecto, tarea' },
      { title: 'En Proceso', description: 'Se encuentra en proceso.', type: 'proyecto, tarea' },
      { title: 'Finalizado',
        description: 'Ha cumplido con todos sus objetivos establecidos y ha concluido exitosamente.',
        type: 'proyecto, tarea' },
      { title: 'Cancelado',
        description: 'Ha sido interrumpido y no continuará su ejecución. ',
        type: 'proyecto, tarea' },
      { title: 'Rechazado',
        description: 'Fue evaluado y no cumplió con los criterios necesarios para su aprobación. ',
        type: 'proyecto, tarea' },
    ])
  }
}
