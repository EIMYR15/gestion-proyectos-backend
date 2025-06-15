import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    await Role.createMany([
    { title: 'Administrador', description: 'Rol de administrador', permissions: 'TODOS' },
    { title: 'Usuario', description: 'Rol de usuario regular', permissions: 'SOLO_LECTURA' },
    { title: 'Gerente de Proyecto', description: 'Gestiona proyectos y equipos', permissions: 'GESTION_PROYECTO' },
    { title: 'Líder de Equipo', description: 'Lidera un equipo dentro de un proyecto', permissions: 'LIDER_EQUIPO' },
    { title: 'Desarrollador', description: 'Desarrolla y mantiene tareas del proyecto', permissions: 'ESCRIBIR_TAREAS' },
    { title: 'Tester QA', description: 'Prueba y valida entregables del proyecto', permissions: 'PRUEBA_TAREAS' },
    { title: 'Cliente', description: 'Visualiza el progreso y entregables del proyecto', permissions: 'VER_PROYECTO' },
    { title: 'Soporte', description: 'Proporciona soporte y resuelve incidencias', permissions: 'SOPORTE' },
    { title: 'Invitado', description: 'Acceso limitado para colaboradores externos', permissions: 'LIMITADO' },

    ])
  }
}
