import { User } from './User';

export interface Message {
  id: number;
  content?: string;
  messageDate?: Date | null; 
  isRead?: number | null; 
  isDeleted?: number | null; 
  senderId?: number | null; 
  receiverId?: number | null; 
  receiver?: User | null; 
  sender?: User | null; 
}
