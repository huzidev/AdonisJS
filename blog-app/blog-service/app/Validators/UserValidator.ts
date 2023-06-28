import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export class UserUpdate {
  public schema = schema.create({
    // no need to add optional here becayse if user gets on to update route then user will update info
    username: schema.string({ trim: true }, [rules.minLength(4)])
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required to update details'
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