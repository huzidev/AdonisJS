import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import User from 'App/Models/User'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('role', User.roles).defaultTo(User.roles[0]).notNullable()

   
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
