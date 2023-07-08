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
      table.string("slug", 180).notNullable().unique();
      table.string("title", 100).notNullable();
      table.string("image", 100).notNullable();
      // text can be long therefore using text instead of string
      table.text("content").notNullable();

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
