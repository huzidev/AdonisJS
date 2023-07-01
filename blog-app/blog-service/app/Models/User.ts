import Hash from '@ioc:Adonis/Core/Hash';
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Article from './Article';

// [number] for access the type
export type UserRole = typeof User.roles[number]

export default class User extends BaseModel {
  // useing const This means that the array elements cannot be modified
  public static roles = ['user', 'blogger', 'admin', 'super-admin'] as const 
  public static getRoleIndex = (role: UserRole): number => User.roles.indexOf(role)
  // created automatically from node ace auth configure
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  // serializeAs: null means password should not be send to return type as JSON
  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public role: UserRole
  
  @hasMany(() => Article)
  public articles: HasMany<typeof Article>

  @column({ consume: (v) => !!v })
  public isActive: boolean = true

  @column({ consume: (v) => !!v })
  public isBanned: boolean = false

  @column({ consume: (v) => !!v })
  public isVerified: boolean = false

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public isAdmin() {
    return User.roles.indexOf(this.role) >= 2
  }

  public isBlogger() {
    return User.roles.indexOf(this.role) >= 1
  }

  public isUser() {
    return this.role === 'user'
  }

  public hasAccess(role: UserRole): boolean {
    // all roles
    const access = User.getRoleIndex(role)
    // loggedIn user role
    const myRole = User.getRoleIndex(this.role)
    const check = myRole >= access
    return check
  }
}
