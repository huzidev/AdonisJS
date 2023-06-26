import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export class CreateArticle {
  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(6), rules.regex(/^[a-zA-Z0-9\s]+$/)]),
    content: schema.string({ trim: true }, [rules.minLength(12)]),
    image: schema.string()
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required to create blog',
  }
}

export class UpdateArticle {
  public schema = schema.create({
    title: schema.string.optional({ trim: true }, [rules.minLength(6), rules.regex(/^[a-zA-Z0-9\s]+$/)]),
    content: schema.string.optional({ trim: true }, [rules.minLength(12)]),
    image: schema.string.optional()
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required to update blog'
  }
}
