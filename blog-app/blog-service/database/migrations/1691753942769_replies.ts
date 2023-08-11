import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'replies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // not using onDelete cascade here because USER can't be deleted
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      // if that artcile is delete then delte comment and replies as well related to this
      table.integer('article_id').unsigned().references('id').inTable('articles').onDelete('CASCADE').notNullable()
      // delete all replies if comment with that id is deleted
      table.integer('comment_id').unsigned().references('id').inTable('comments').onDelete('CASCADE').notNullable()

      table.timestamp("created_at", { useTz: true }).notNullable().defaultTo(this.now());
      table.timestamp("updated_at", { useTz: true }).notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
