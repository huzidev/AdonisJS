import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import User from 'App/Models/User'

// ENUM means Validates the property to be one from the available choices

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('role', User.roles).after("email").defaultTo(User.roles[0]).notNullable()

      table.boolean('is_active').defaultTo(true).notNullable()
      table.boolean('is_banned').defaultTo(false).notNullable()
      table.boolean('is_verified').defaultTo(false).notNullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role')
      table.dropColumn('is_active')
      table.dropColumn('is_banned')
      table.dropColumn('is_verified')
    })
  }
}
