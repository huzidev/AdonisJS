import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export class UserUpdate {
  public schema = schema.create({
    username: schema.string.optional({ trim: true }, [rules.minLength(4)])
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required to update details'
  }
}