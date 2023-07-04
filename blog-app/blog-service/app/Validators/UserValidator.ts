import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export class UserUpdate {
  public schema = schema.create({
    // no need to add optional here becayse if user gets on to update route then user will update info
    username: schema.string({ trim: true }, [rules.minLength(4)])
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required to update details'
  }
}

export class UserV1Update {
  public static schemaMap = {
    name: schema.string.optional({ trim: true }, [rules.fullName()]),
    role: schema.enum.optional(User.roles),
    isVerified: schema.boolean.optional(),
    isActive: schema.boolean.optional(),
    isBanned: schema.boolean.optional(),
  }

  public static messages = {
    ...authValidationMessages,
    required: '{{ field }} is required to update user',
  }

  public schema = schema.create(UserV1Update.schemaMap)
  public messages = UserV1Update.messages
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