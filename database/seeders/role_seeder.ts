import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        title: 'Administrador',
        description: 'Tiene acceso completo al sistema, incluyendo gestión de usuarios, proyectos y configuración.',
        permissions: JSON.stringify(['crear_usuario', 'editar_usuario', 'eliminar_usuario', 'crear_proyecto', 'editar_proyecto', 'ver_reportes']),
      },
      {
        title: 'Líder de Proyecto',
        description: 'Encargado de gestionar proyectos, asignar tareas y supervisar el progreso.',
        permissions: JSON.stringify(['crear_proyecto', 'editar_proyecto', 'asignar_tareas', 'ver_reportes']),
      },
      {
        title: 'Colaborador',
        description: 'Puede ver tareas asignadas, registrar avances y participar en discusiones.',
        permissions: JSON.stringify(['ver_tareas', 'actualizar_estado', 'comentar']),
      },
      {
        title: 'Cliente',
        description: 'Visualiza el estado de sus proyectos y envía retroalimentación.',
        permissions: JSON.stringify(['ver_proyecto', 'enviar_feedback']),
      },
    ])
  }
}
