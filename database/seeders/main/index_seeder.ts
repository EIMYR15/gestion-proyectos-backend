import { BaseSeeder } from '@adonisjs/lucid/seeders'
import app from '@adonisjs/core/services/app'

export default class IndexSeeder extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    if (
      !Seeder.default.environment ||
      (!Seeder.default.environment.includes('development') && app.inDev) ||
      (!Seeder.default.environment.includes('testing') && app.inTest) ||
      (!Seeder.default.environment.includes('production') && app.inProduction)
    ) {
      return
    }

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