import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export const authValidationMessages = {
  'required': '{{ field }} is required to sign up',
  'name.alpha': 'Invalid name',
  'email.email': 'Invalid email address',
  'password.minLength': 'Password should be at least 6 characters long',
}

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
    // if didn't put correct email format
    'email.email': 'Invalid email address',
    'username.unique' : 'Username is already taken',
    'email.unique': 'Email is already taken',
    required: "{{ field }} is required to signup"
  }
}

export class AuthSignIn {
  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string()
  })
  public messages = {
    // if didn't put correct email format
    'email.email': 'Invalid email address',
    required: '{{ field }} is required to sign in'
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
    email: schema.string({}, [rules.email()])
  })

  public messages = {
    required: '{{ field }} is required to reset password'
  }
}

export class AuthResetPassword {
  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    code: schema.string({}, [rules.verificationCode()]),
    password: schema.string({}, [rules.minLength(6), rules.confirmed('passwordConfirmation')])
  })

  public messages = {
    required: '{{ field }} is required to reset password'
  }
}