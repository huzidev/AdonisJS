import EmailVerificationCodes from "./1688145034146_email_verification_codes"

// since all the columns are same as of email_verification_codes table
export default class ResetPasswordCodes extends EmailVerificationCodes {
  protected tableName = 'reset_password_codes'
}
