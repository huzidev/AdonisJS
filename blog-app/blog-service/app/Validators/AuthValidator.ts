import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export class AuthSignUp {
  public schema = schema.create({
    isBlogger: schema.boolean.optional(),
    username: schema.string({ trim: true }, [
      rules.fullName(),
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
    required: "{{ field }} is required to signup"
  }
}

export class AuthSignIn {
  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(6)])
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required to Login'
  }
}

export class AuthVerifyEmailVerificationCode {
  public schema = schema.create({
    code: schema.string({ trim: true }, [rules.verificationCode()]),
  })

  public messages = {
    'required': '{{ field }} is required for email verification',
    'code.*': 'Invalid code'
  }
}

export class AuthResetPasswordSendCode {
  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
  })

  public messages = {
    required: '{{ field }} is required to reset password',
  }
}

export class AuthResetPassword {
  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    code: schema.string({}, [rules.verificationCode()]),
    password: schema.string({}, [rules.minLength(6), rules.confirmed('passwordConfirmation')]),
  })

  public messages = {
    required: '{{ field }} is required to reset password',
  }
}