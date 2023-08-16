import { ProfileSetting } from './ProfileSetting';
import { User } from './User';

export interface Profile {
  id?: number;
  firstName?: string;
  lastName?: string;
  imagePath?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: Date | null;
  bio?: string;
  rate?: number | null;
  userId?: number | null;
  receivedImageFile?: File | null; // Assuming File is a TypeScript interface for IFormFile
  retrievedImageFile?: Uint8Array | File | null; // Assuming Uint8Array is the TypeScript equivalent of byte[]
  profilesettings?: ProfileSetting[];
  user?: User | null;
}
