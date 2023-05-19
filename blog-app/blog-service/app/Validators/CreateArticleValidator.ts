import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class CreateArticleValidator {
  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(6)]),
    image: schema.string(),
    content: schema.string({ trim: true }, [rules.minLength(12)])
  })

  public messages: CustomMessages = {}
}
