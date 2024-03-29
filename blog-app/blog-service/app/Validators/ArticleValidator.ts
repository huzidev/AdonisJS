import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import Article from 'App/Models/Article'
import Sort from 'App/Utils/Sort'

export class CreateArticle {
  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(6), rules.regex(/^[a-zA-Z0-9\s]+$/)]),
    content: schema.string({ trim: true }, [rules.minLength(12)]),
    category: schema.enum(Article.categories),
    image: schema.string()
  })

  public messages: CustomMessages = {
    'minLength': 'The content must have minimum of {{ options.minLength }} characters',
    'regex': "Kindly use only alphabets or numbers in title",
    required: '{{ field }} is required to create blog'
  }
}

export class UpdateArticle {
  public schema = schema.create({
    title: schema.string.optional({ trim: true }, [rules.minLength(6), rules.regex(/^[a-zA-Z0-9\s]+$/)]),
    content: schema.string.optional({ trim: true }, [rules.minLength(12)]),
    image: schema.string.optional()
  })

  public messages: CustomMessages = {
    'minLength': 'The content must have minimum of {{ options.minLength }} characters',
    'regex': "Kindly use only alphabets or numbers in title",
    required: '{{ field }} is required to update blog'
  }
}

export class BlogListFilters {
  public static schema = schema.create({
    sort: schema.object.optional().members({
      // enum is for available choice like here Sort.type have two available choice either asc or desc
      id: schema.enum.optional(Sort.types),
      title: schema.enum.optional(Sort.types),
      content: schema.enum.optional(Sort.types),
      createdAt: schema.enum.optional(Sort.dateValue),
      updatedAt: schema.enum.optional(Sort.dateValue),
      // username row is not in Articles table therefore we'll use join query for link
      username: schema.enum.optional(Sort.types),
      blogs: schema.enum.optional(["popular"]),
      category: schema.enum.optional(Article.categories)
    }),
  })
  public static messages = {}
}
