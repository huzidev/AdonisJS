import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import pick from 'lodash/pick'

// when user is updating own self


// when admin is updating a user
export class UserUpdate {
  public static schemaMap = {
    username: schema.string.optional({ trim: true }, [rules.fullName()]),
    role: schema.enum.optional(User.roles),
    isVerified: schema.boolean.optional(),
    isActive: schema.boolean.optional(),
    isBanned: schema.boolean.optional()
  }

  public static messages = {
    required: '{{ field }} is required to update user',
  }

  // if we didn't used this schema.create(userUpdate) then we'll get the error because it is mandatory to user schema.create to define the schema
  public schema = schema.create(UserUpdate.schemaMap)
  public messages = UserUpdate.messages
}

// because of public static schemaMap we can access that properties their as well because of the keyword static
export class UserUpdateMe {
  public schema = schema.create(pick(UserUpdate.schemaMap, ['username']))
  public messages = UserUpdate.messages
}

export class UserCreate {
  public schema = schema.create({
    username: schema.string({ trim: true }, [rules.fullName()]),
    email: schema.string({}, [rules.email()]),
    role: schema.enum.optional(User.roles),
    isVerified: schema.boolean.optional(),
    isActive: schema.boolean.optional(),
    password: schema.string({}, [rules.minLength(6), rules.confirmed('passwordConfirmation')])
  })

  public static messages = {
    required: '{{ field }} is required to update user',
  }
}

export class UserList {
  public static schema = schema.create({
    id: schema.number.optional(),
    username: schema.string.optional({ escape: true }),
    email: schema.string.optional({ escape: true }),
    created_at: schema.date.optional({ format: 'yyyy-MM-dd' }),
    updated_at: schema.date.optional({ format: 'yyyy-MM-dd' })
  })
  public static messages = {}

}