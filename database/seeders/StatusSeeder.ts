import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Status from '#models/Status'

export default class StatusSeeder extends BaseSeeder {
  public async run() {
    await Status.createMany([
      // Estados para tareas (type: 'tarea')
{ title: 'Por Hacer', description: 'La tarea está abierta', type: 'tarea' },
{ title: 'En Progreso', description: 'La tarea está en progreso', type: 'tarea' },
{ title: 'En Revisión', description: 'La tarea está en revisión', type: 'tarea' },
{ title: 'Completada', description: 'La tarea está cerrada', type: 'tarea' },

// Estados para proyectos (type: 'proyecto')
{ title: 'Activo', description: 'El proyecto está activo', type: 'proyecto' },
{ title: 'En Progreso', description: 'El proyecto está en pausa', type: 'proyecto' },
{ title: 'Completado', description: 'El proyecto está completado', type: 'proyecto' },
{ title: 'Archivado', description: 'El proyecto está archivado', type: 'proyecto' },
{ title: 'Cancelado', description: 'El proyecto ha sido cancelado', type: 'proyecto' },

    ])
  }
}
