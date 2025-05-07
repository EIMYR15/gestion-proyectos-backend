import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('user_id').unsigned().references('id').inTable('users')
      table.string('statu_id').unsigned().references('id').inTable('status')
      table.string('client_id').unsigned().references('id').inTable('users')
      table.string('start_date').notNullable()
      table.string('end_date').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
