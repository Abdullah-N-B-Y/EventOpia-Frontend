import { User } from './User';

export interface Category {
  id: number;
  name?: string;
  imagePath?: string;
  description?: string;
  creationDate?: Date | null; 
  adminId?: number | null; 
  receivedImageFile?: File | null; // Assuming File is a TypeScript interface for IFormFile
  retrievedImageFile?: Uint8Array | File | null; // Assuming Uint8Array is the TypeScript equivalent of byte[]
  admin?: User | null;
  events: Event[];
}
