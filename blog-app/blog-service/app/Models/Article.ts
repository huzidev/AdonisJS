import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

// model name has to be same as of table name of database but singular form
export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // adding manually
  @column()
  public custom_id: number

  @column()
  public title: string

  @column()
  public image: string

  @column()
  public content: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Can't send directly random value to database from controllers beacause we are using model therefore those values were send from the models
  // here before creating ours article therefore used beforeCreate assigning random value to custom_id
  @beforeCreate()
  public static async generateId(id: Article) {
    id.custom_id = Date.now()
  }
}
