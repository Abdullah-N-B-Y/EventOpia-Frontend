export interface UpdatePasswordDTO {
  OldPassword: string | null;
  NewPassword: string | null;
  ConfirmPassword: string | null;
}
