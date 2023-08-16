import { User } from './User';

export interface ContactUsEntry {
  id?: number;
  subject?: string;
  content?: string;
  email?: string;
  phoneNumber?: number | null; 
  adminId?: number | null; 
  admin?: User | null; 
}
