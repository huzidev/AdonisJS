import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator';
import pick from 'lodash/pick';

export class AddReply {
  public static schemaMap = {
    userId: schema.number(),
    articleId: schema.number(),
    commentId: schema.number(),
    reply: schema.string({ trim: true }, [rules.minLength(2)])
  }

  public messages: CustomMessages = {
    required: '{{ field }} is required for reply',
  }
  public schema = schema.create(AddReply.schemaMap)
}

export class EditReply {
  public schema = schema.create(pick(AddReply.schemaMap, ['reply']))
  public messages: CustomMessages = {
    required: '{{ field }} is required for edit reply',
  }
}
