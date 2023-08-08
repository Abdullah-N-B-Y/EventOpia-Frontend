import { User } from './User';

export interface Testimonial {
  id: number;
  content?: string;
  creationDate?: Date | null;
  status?: string;
  userId?: number | null;
  user?: User | null;
}
