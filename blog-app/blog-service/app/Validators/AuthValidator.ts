import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export class AuthSignUp {
  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.minLength(4),
      rules.unique({
        table: "users",
        column: "username"
      })
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({
        table: "users",
        column: "email"
      })
    ]),
    password: schema.string({}, [
      rules.minLength(6), 
      rules.confirmed("passwordConfirmation")
    ]),
  })

  public messages: CustomMessages = {
    required: "{{ field }} is required to signup",
  }
}

export class AuthSignIn {
  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(6)])
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required to Login',
  }
}

export class AuthVerifyEmailVerificationCode {
  public schema = schema.create({
    code: schema.string({ trim: true }, [rules.verificationCode()]),
  })

  public messages = {
    'required': '{{ field }} is required for email verification',
    'code.*': 'Invalid code',
  }
}