import { User } from './User';

export interface Notification {
  id: number;
  content?: string;
  receivedDate?: Date | null; 
  receiverId?: number | null; 
  receiver?: User | null; 
}
