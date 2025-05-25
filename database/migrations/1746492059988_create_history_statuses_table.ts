import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'history_statuses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('status_id').unsigned().references('id').inTable('statuses').onDelete('CASCADE')
      table.string('entity_type').notNullable() // Stores the model type (e.g., 'Task', 'Project')
      table.integer('entity_id').unsigned().notNullable() // Stores the related model's ID
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
