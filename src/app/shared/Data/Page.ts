import { User } from './User';

export interface Page {
  id: number;
  content1?: string;
  content2?: string;
  backgroundImagePath?: string;
  adminId?: number | null; 
  receivedImageFile?: File | null; // Assuming File is a TypeScript interface for IFormFile
  retrievedImageFile: string; // Assuming Uint8Array is the TypeScript equivalent of byte[]
  admin?: User | null; 
}
