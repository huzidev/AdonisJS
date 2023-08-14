import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Article from './Article'
import User from './User'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public articleId: number
  
  @column()
  public parentId: number

  @column()
  public content: string

  @belongsTo(() => User, {
    foreignKey: "userId" 
  })
  public owner: BelongsTo<typeof User>

  @belongsTo(() => Article, {
    foreignKey: "articleId" 
  })
  public article: BelongsTo<typeof Article>

  @belongsTo(() => Comment, {
    foreignKey: 'parentId',
  })
  public parentComment: BelongsTo<typeof Comment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
