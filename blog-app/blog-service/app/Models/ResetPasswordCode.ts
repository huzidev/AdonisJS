import EmailVerificationCode from './EmailVerificationCode'

// model is same as of EmailVerificationCode model
export default class ResetPasswordCode extends EmailVerificationCode {
  public static table = 'reset_password_codes'
}
