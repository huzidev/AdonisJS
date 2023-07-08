import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class FavoriteArticles extends BaseSchema {
  protected tableName = "favorite_articles";

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // this is already added
      table.increments("id");
      // no need for OnDelte("Cascade") because OnDelete("Cascade") is used when user with that id is delete then all the blogs related to that user must also delete
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('article_id').unsigned().references('id').inTable('articles').notNullable()
      
      // this unique is useful if a user with id 1 have article with id 5 and tries to add the same article with id 5 then user CAN'T
      table.unique(['user_id', 'article_id'])
      table.index(['user_id', 'article_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true }).notNullable().defaultTo(this.now());
      table.timestamp("updated_at", { useTz: true }).notNullable();
    })

  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
