import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('type_document_id').unsigned().references('id').inTable('type_documents')
      table.bigInteger('document').notNullable().unsigned()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.bigInteger('telephone').notNullable().unsigned()
      table.integer('city_id').unsigned().references('id').inTable('cities')
      table.json('permissions').defaultTo('{}')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
