import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('article_id').unsigned().references('id').inTable('articles').onDelete('CASCADE').notNullable()
      table.string("comment", 100).notNullable();
      table.integer('reply_id').unsigned().references('id').inTable('comments');
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
