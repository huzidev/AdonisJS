import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export class AddComment {
  public static schemaMap = {
    userId: schema.number(),
    articleId: schema.number(),
    comment: schema.string({ trim: true }, [rules.minLength(2)]),
  }

  public messages: CustomMessages = {
    required: '{{ field }} is required for comment',
  }
  public schema = schema.create(AddComment.schemaMap)
}

export class EditComment {
  public schema = schema.create(AddComment.schemaMap)
  public messages: CustomMessages = {
    required: '{{ field }} is required for edit comment',
  }
}
