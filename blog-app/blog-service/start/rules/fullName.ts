import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule(
  'fullName',
  async (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    const regex = /^[a-zA-Z0-9\s]*$/

    if (!regex.test(value)) {
      errorReporter.report(pointer, 'match', 'Only alphabets and numbers are allowed for username', arrayExpressionPointer)
      return
    }

    const trimmed = value.trim()
    if (trimmed.length < 2) {
      errorReporter.report(
        pointer,
        'minLength',
        `${pointer} should me at least 2 characters long`,
        arrayExpressionPointer
      )
    }
  },
  () => ({
    async: true,
  })
)
