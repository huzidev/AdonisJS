import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export class CreateArticle {
  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(6)]),
    content: schema.string({ trim: true }, [rules.minLength(12)]),
    image: schema.string()
  })

  public messages: CustomMessages = {}
}

export class UpdateArticle {
  public schema = schema.create({
    title: schema.string.optional({ trim: true }, [rules.minLength(6)]),
    content: schema.string.optional({ trim: true }, [rules.minLength(12)]),
    image: schema.string.optional()
  })

  public messages: CustomMessages = {}
}
