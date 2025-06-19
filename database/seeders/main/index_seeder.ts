import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class IndexSeeder extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  async run() {
    await this.seed(await import('#database/seeders/CitySeeder'))
    await this.seed(await import('#database/seeders/StatusSeeder'))
    await this.seed(await import('#database/seeders/PrioritySeeder'))
    await this.seed(await import('#database/seeders/TypeDocumentSeeder'))

    await this.seed(await import('#database/seeders/RoleSeeder'))
    await this.seed(await import('#database/seeders/UserSeeder'))
    await this.seed(await import('#database/seeders/RoleUserSeeder'))

    await this.seed(await import('#database/seeders/ProjectSeeder'))
    await this.seed(await import('#database/seeders/TaskSeeder'))

    await this.seed(await import('#database/seeders/CommentSeeder'))
    await this.seed(await import('#database/seeders/HistoryStatusSeeder'))
  }
}