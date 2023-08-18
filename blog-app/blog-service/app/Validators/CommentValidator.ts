import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import pick from 'lodash/pick'

export class AddComment {
  public static schemaMap = {
    userId: schema.number(),
    articleId: schema.number(),
    parentId: schema.number.nullable(),
    content: schema.string({ trim: true }, [rules.minLength(2)]),
  }

  public messages: CustomMessages = {
    required: '{{ field }} is required for adding comment',
  }
  public schema = schema.create(AddComment.schemaMap)
}

export class EditComment {
  public schema = schema.create(pick(AddComment.schemaMap, ['content']))
  public messages: CustomMessages = {
    required: '{{ field }} is required for edit comment',
  }
}
