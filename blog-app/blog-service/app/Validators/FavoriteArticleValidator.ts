import { CustomMessages, schema } from '@ioc:Adonis/Core/Validator';

export class AddFavoriteArticle {
  public static schemaMap = {
    userId: schema.number(),
    articleId: schema.number(),
    ownerId: schema.number()
  }

  public schema = schema.create(AddFavoriteArticle.schemaMap)
  public messages: CustomMessages = {
    required: '{{ field }} is required to create blog',
  }
}

export class RemoveFavoriteArticle {
  public schema = schema.create(AddFavoriteArticle.schemaMap);
  public messages: CustomMessages = {
    required: '{{ field }} is required to remove blog',
  }
}