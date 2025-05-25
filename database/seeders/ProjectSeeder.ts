import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Project from '#models/Project'

export default class ProjectSeeder extends BaseSeeder {
    public async run() {
        await Project.createMany([
            {
                title: 'Project A',
                description: 'Description of Project A',
                userId: 1,
                statusId: 1,
                clientId: 2,
                startDate: new Date('2025-05-01'),
                endDate: new Date('2025-12-31'),
            },
            {
                title: 'Project B',
                description: 'Description of Project B',
                userId: 2,
                statusId: 2,
                clientId: 1,
                startDate: new Date('2025-06-01'),
                endDate: new Date('2025-11-30'),
            },
        ])
    }
}