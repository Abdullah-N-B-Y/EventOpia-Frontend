import { User } from './User';

export interface Booking {
  id: number;
  bookingDate?: Date | null; 
  userId?: number | null; 
  eventId?: number | null; 
  event?: Event | null; 
  user?: User | null; 
}
