import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

// model name has to be same as of table name of database but singular form
export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // adding manually
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
}
