import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('article_id').unsigned().references('id').inTable('articles').onDelete('CASCADE').notNullable()
      // nullable because when user clicked on reply then it'll store id of comment else null
      table.integer('parent_id').unsigned().nullable().references('id').inTable('comments');
      table.string("content", 100).notNullable();
      
      table.timestamp("created_at", { useTz: true }).notNullable().defaultTo(this.now());
      table.timestamp("updated_at", { useTz: true }).notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
