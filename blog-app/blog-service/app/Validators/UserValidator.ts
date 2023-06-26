import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export class UserUpdate {
  public schema = schema.create({
    title: schema.string.optional({ trim: true }, [rules.minLength(6)]),
    content: schema.string.optional({ trim: true }, [rules.minLength(12)]),
    image: schema.string.optional()
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required to update blog'
  }
}