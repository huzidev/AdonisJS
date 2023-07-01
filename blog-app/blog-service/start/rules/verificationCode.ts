import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule(
  'verificationCode',
  async (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    const regex = /^[0-9]*$/

    if (!regex.test(value)) {
      errorReporter.report(pointer, 'match', 'Invalid code', arrayExpressionPointer)
      return
    }

    const trimmed = value.trim()
    if (trimmed.length !== 6) {
      errorReporter.report(pointer, 'match', 'Invalid code', arrayExpressionPointer)
    }
  },
  () => ({
    async: true,
  })
)
