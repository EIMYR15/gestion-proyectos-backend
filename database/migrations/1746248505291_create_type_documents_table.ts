import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'type_documents'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('abbreviation').notNullable()
      table.string('title').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
