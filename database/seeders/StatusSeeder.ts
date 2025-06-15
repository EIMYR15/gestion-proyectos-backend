import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Status from '#models/Status'

export default class StatusSeeder extends BaseSeeder {
  public async run() {
    await Status.createMany([
      // Estados para tareas (type: 'tarea')
{ title: 'Por Hacer', description: 'La tarea está abierta', type: 'task' },
{ title: 'En Progreso', description: 'La tarea está en progreso', type: 'task' },
{ title: 'En Revisión', description: 'La tarea está en revisión', type: 'task' },
{ title: 'Completada', description: 'La tarea está cerrada', type: 'task' },

// Estados para proyectos (type: 'proyecto')
{ title: 'Activo', description: 'El proyecto está activo', type: 'project' },
{ title: 'En Progreso', description: 'El proyecto está en pausa', type: 'project' },
{ title: 'Completado', description: 'El proyecto está completado', type: 'project' },
{ title: 'Archivado', description: 'El proyecto está archivado', type: 'project' },
{ title: 'Cancelado', description: 'El proyecto ha sido cancelado', type: 'project' },

    ])
  }
}
