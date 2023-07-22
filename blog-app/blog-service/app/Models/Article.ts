import { BaseModel, BelongsTo, beforeCreate, belongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm'
import Sort from 'App/Utils/Sort'
import { DateTime } from 'luxon'
import User from './User'

// model name has to be same as of table name of database but singular form
export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // adding manually
  @column()
  public slug: string

  @column()
  public title: string
  
  @column()
  public image: string
  
  @column()
  public content: string
  
  @column()
  public ownerId: number

  // even if in mysql we've owner_id but here we've to write it in camel case
  @belongsTo(() => User, {
    foreignKey: "ownerId" 
  })
  public owner: BelongsTo<typeof User>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Can't send directly random value to database from controllers beacause we are using model therefore those values were send from the models
  // here before creating ours article therefore used beforeCreate assigning random value to custom_id
  @beforeCreate()
  public static async generateSlug(data: Article) {
    // to add - between every words in title to create a slug
    const titleSlug = data.title.toLocaleLowerCase().replace(/ /g, "-");
    data.slug = `${titleSlug}-${Date.now()}`;
  }

  public static filtersSort = scope((query, filters) => {
    Sort.mapObjToQuery(filters.sort, query)
  })
}
