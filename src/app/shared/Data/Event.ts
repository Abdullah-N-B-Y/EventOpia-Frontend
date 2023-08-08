import { Booking } from './Booking';
import { Category } from './Category';
import { User } from './User';

export interface Event {
  id: number;
  name?: string;
  attendingCost?: number | null; 
  startDate?: Date | null; 
  endDate?: Date | null; 
  status?: string;
  eventDescription?: string;
  imagePath?: string;
  eventCapacity?: number | null; 
  latitude?: number | null; 
  longitude?: number | null; 
  eventCreatorId?: number | null; 
  categoryId?: number | null; 
  receivedImageFile?: File | null; // Assuming File is a TypeScript interface for IFormFile
  retrievedImageFile?: Uint8Array | File | null; // Assuming Uint8Array is the TypeScript equivalent of byte[]
  bookings: Booking[]; 
  category?: Category | null; 
  comments: Comment[]; 
  eventcreator?: User | null; 
}
