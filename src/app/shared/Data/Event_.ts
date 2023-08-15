import { Booking } from './Booking';
import { Category } from './Category';
import { User } from './User';

export interface Event_ {
    id?: number;
    name: string;
    attendingCost: number;
    startDate?: Date | null;
    endDate?: Date | null;
    status?: string;
    eventDescription?: string;
    imagePath?: string;
    eventCapacity?: number | null;
    latitude?: number;
    longitude?: number;
    address: string;
    eventCreatorId?: number | null;
    categoryId?: number | null;
    receivedImageFile?: File | null; // Assuming File is a TypeScript interface for IFormFile
    retrievedImageFile?: string; // Assuming Uint8Array is the TypeScript equivalent of byte[]
    bookings?: Booking[];
    category?: Category | null;
    comments?: Comment[];
    eventcreator?: User | null;
}
