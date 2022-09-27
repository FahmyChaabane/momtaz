export interface ForgotPasswordJobDto {
  username: string;
  email: string;
  resetPasswordToken: string;
}
