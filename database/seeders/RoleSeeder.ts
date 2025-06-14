import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    await Role.createMany([
      { title: 'Admin', description: 'Administrator role', permissions: 'ALL' },
      { title: 'User', description: 'Regular user role', permissions: 'READ_ONLY' },
      { title: 'Project Manager', description: 'Manages projects and teams', permissions: 'PROJECT_MANAGE' },
      { title: 'Team Leader', description: 'Leads a team within a project', permissions: 'TEAM_LEAD' },
      { title: 'Developer', description: 'Develops and maintains project tasks', permissions: 'TASK_WRITE' },
      { title: 'QA Tester', description: 'Tests and validates project deliverables', permissions: 'TASK_TEST' },
      { title: 'Client', description: 'Views project progress and deliverables', permissions: 'PROJECT_VIEW' },
      { title: 'Support', description: 'Provides support and handles issues', permissions: 'SUPPORT' },
      { title: 'Guest', description: 'Limited access for external collaborators', permissions: 'LIMITED' },
    ])
  }
}
