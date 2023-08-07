import { CustomMessages, schema } from '@ioc:Adonis/Core/Validator'

export class AddReaction {
  public schema = schema.create({
    userId: schema.number(),
    articleId: schema.number(),
    isLike: schema.boolean.optional(),
    isDislike: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required to react on blog',
  }
}

export class GetReactions {
  public schema = schema.create({
    isLike: schema.boolean.optional(),
    isDislike: schema.boolean.optional()
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required to get reactons of blog',
  }
}
