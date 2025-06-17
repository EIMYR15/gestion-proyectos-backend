import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/Role'
import { PERMISSIONS } from '../../config/permissions.js'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    await Role.createMany([
      {
        title: 'Administrador',
        description: 'Rol de administrador',
        permissions: Object.keys(PERMISSIONS).reduce(
          (acc, key) => {
            acc[key] = true
            return acc
          },
          {} as Record<string, boolean>
        ),
      },
      { title: 'Usuario', description: 'Rol de usuario regular' },
      { title: 'Gerente de Proyecto', description: 'Gestiona proyectos y equipos' },
      { title: 'Líder de Equipo', description: 'Lidera un equipo dentro de un proyecto' },
      { title: 'Desarrollador', description: 'Desarrolla y mantiene tareas del proyecto' },
      { title: 'Tester QA', description: 'Prueba y valida entregables del proyecto' },
      { title: 'Cliente', description: 'Visualiza el progreso y entregables del proyecto' },
      { title: 'Soporte', description: 'Proporciona soporte y resuelve incidencias' },
      { title: 'Invitado', description: 'Acceso limitado para colaboradores externos' },
    ])
  }
}
