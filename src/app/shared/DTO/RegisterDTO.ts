export interface RegisterDTO {
  Username: string | null;
  Password: string | null;
  Email: string | null;
  VerificationCode: string;
  UserStatus: string;
  RoleId: number;
}
