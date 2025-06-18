import type { HttpContext } from '@adonisjs/core/http'
import { PERMISSIONS } from '../../config/permissions.js'
import Project from '#models/Project'
import Task from '#models/Task'
import User from '#models/User'
import Role from '#models/Role'
import Status from '#models/Status'

export default class AppController {
  public async getPermissions({ response }: HttpContext) {
    return response.ok(PERMISSIONS)
  }

  public async getDashboard({ response }: HttpContext) {
    // Cantidad total
    const [projectsCount, tasksCount, usersCount, rolesCount] = await Promise.all([
      Project.query().count('* as total'),
      Task.query().count('* as total'),
      User.query().count('* as total'),
      Role.query().count('* as total'),
    ])

    // Tareas agrupadas por estado
    const tasksByStatus = await Task.query()
      .select('status_id')
      .count('* as total')
      .groupBy('status_id')

    // Proyectos agrupados por estado
    const projectsByStatus = await Project.query()
      .select('status_id')
      .count('* as total')
      .groupBy('status_id')

    // Obtener los títulos de los estados para tareas
    const taskStatusIds = tasksByStatus.map(row => row.statusId)
    const taskStatuses = await Status.query().whereIn('id', taskStatusIds)
    const taskStatusMap = Object.fromEntries(taskStatuses.map(s => [s.id, s.title]))

    // Obtener los títulos de los estados para proyectos
    const projectStatusIds = projectsByStatus.map(row => row.statusId)
    const projectStatuses = await Status.query().whereIn('id', projectStatusIds)
    const projectStatusMap = Object.fromEntries(projectStatuses.map(s => [s.id, s.title]))

    return response.ok({
      projects: Number(projectsCount[0].$extras.total),
      tasks: Number(tasksCount[0].$extras.total),
      users: Number(usersCount[0].$extras.total),
      roles: Number(rolesCount[0].$extras.total),
      tasksByStatus: tasksByStatus.map(row => ({
        statusId: row.statusId,
        statusTitle: taskStatusMap[row.statusId] || '',
        total: Number(row.$extras.total),
      })),
      projectsByStatus: projectsByStatus.map(row => ({
        statusId: row.statusId,
        statusTitle: projectStatusMap[row.statusId] || '',
        total: Number(row.$extras.total),
      })),
    })
  }
}


