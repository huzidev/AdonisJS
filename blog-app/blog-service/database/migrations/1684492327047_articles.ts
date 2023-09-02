import BaseSchema from '@ioc:Adonis/Lucid/Schema';

// TO UPDATE table create different migration with same name as of the table you wanted to update then use alterTable
// export default class extends BaseSchema {
//   protected tableName = 'articles'

//   public async up () {
//     // for altering the table other wise old data will get removed
//     this.schema.alterTable(this.tableName, (table) => {

//     })
//   }

// if wanted to add some Default values to existing column
// example already exist column called title and watned to add default value called title = Hello so use .alter() keyword
// table.integer("title").alter().defaultTo("Hello")

export default class Articles extends BaseSchema {
  protected tableName = "articles";

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // this is already added
      table.increments("id");

      // adding these for table
      // can't change the datatype to int from string for custom_id because maximum value is of 2147 something and date.now in ms is much greater
      table.string("custom_id", 180).notNullable().unique();
      table.string("title", 100).notNullable();
      table.string("category", 100).notNullable();
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
