import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = "articles";

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // this is already added
      table.increments("id");

      // adding these for table
      table.string("custom_id", 180).notNullable().unique();
      table.string("title", 100).notNullable();
      table.string("image", 100).notNullable();
      // text can be long therefore using text instead of string
      table.text("content").notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true })
      table.timestamp("updated_at", { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
