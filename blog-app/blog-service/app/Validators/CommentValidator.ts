import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export class AddComment {
  public schema = schema.create({
    userId: schema.number(),
    articleId: schema.number(),
    comment: schema.string({ trim: true }, [rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required for comment',
  }
}
