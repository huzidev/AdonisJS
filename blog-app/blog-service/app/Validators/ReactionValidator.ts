import { CustomMessages, schema } from '@ioc:Adonis/Core/Validator'

export class AddFavoriteArticle {
  public schema = schema.create({
    userId: schema.number(),
    articleId: schema.number(),
    ownerId: schema.number()
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required to react on blog',
  }
}