import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable()
      table.string('description').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('status_id').unsigned().references('id').inTable('statuses')
      table.integer('client_id').unsigned().references('id').inTable('users')
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
