import { Booking } from './Booking';
import { Category } from './Category';
import { ContactUsEntry } from './ContactUsEntry';
import { Message } from './Message';
import { Page } from './Page';
import { Profile } from './Profile';
import { Role } from './Role';
import { Testimonial } from './Testimonial';

export interface User {
  [x: string]: any;
  id: number;
  username?: string;
  password?: string;
  email?: string;
  verificationCode?: string;
  userStatus?: string;
  roleId?: number | null;
  bookings: Booking[];
  categories: Category[];
  contactUsEntries: ContactUsEntry[];
  events: Event[];
  messageReceivers: Message[];
  messageSenders: Message[];
  notifications: Notification[];
  pages: Page[];
  profiles: Profile[];
  role: Role | null;
  testimonials: Testimonial[];
  comments: Comment[];
}
