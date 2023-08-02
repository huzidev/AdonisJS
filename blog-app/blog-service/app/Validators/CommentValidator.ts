import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export class AddComment {
  public schema = schema.create({
    userId: schema.number(),
    articleId: schema.number(),
    content: schema.string({ trim: true }, [rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required for comment',
  }
}
