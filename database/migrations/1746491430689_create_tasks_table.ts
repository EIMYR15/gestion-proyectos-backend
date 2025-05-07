import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('project_id').unsigned().references('id').inTable('projects')
      table.string('user_id').unsigned().references('id').inTable('users')
      table.string('priority_id').unsigned().references('id').inTable('prioritys')
      table.string('status_id').unsigned().references('id').inTable('status')
      table.string('deadline').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
