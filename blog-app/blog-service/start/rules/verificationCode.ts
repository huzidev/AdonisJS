import { validator } from '@ioc:Adonis/Core/Validator'

// validator.rule is taking three parameters
validator.rule("verificationCode", async (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    // verification code contains numbers only
    const regex = /^[0-9]*$/ 

    // if value contains other than numbers
    if (!regex.test(value)) {
      errorReporter.report(pointer, 'match', 'Invalid code', arrayExpressionPointer)
      return
    }

    // trimmed to trim extra whitespace
    const trimmed = value.trim()
    // if code length is not 6
    if (trimmed.length !== 6) {
      errorReporter.report(pointer, 'match', 'Invalid code', arrayExpressionPointer)
    }
  },
  () => ({
    // async is true because this rule will be used in await way like 
    // const body = await request.validate(AuthVerifyEmailVerificationCode)
    // verificationCode rule is created in AuthVerifyEmailVerificationCode
    async: true,
  })
)
