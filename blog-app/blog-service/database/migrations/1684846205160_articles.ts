import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  public async up () {
    // for altering the table other wise old data will get removed
    this.schema.alterTable(this.tableName, (table) => {
      table.string('uid').after('id').notNullable()

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
