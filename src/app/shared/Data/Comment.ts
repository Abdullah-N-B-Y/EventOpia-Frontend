import { User } from './User';

export interface Comment {
  id: number;
  content?: string;
  eventId?: number | null; 
  userId?: number | null; 
  event?: Event | null; 
  user?: User | null;
}
