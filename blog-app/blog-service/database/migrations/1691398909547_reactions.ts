import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('article_id').unsigned().references('id').inTable('articles').onDelete('CASCADE').notNullable()
      
      table.boolean('is_like').defaultTo(false).notNullable()
      table.boolean('is_dislike').defaultTo(false).notNullable()

      table.unique(['user_id', 'article_id'])
      
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
