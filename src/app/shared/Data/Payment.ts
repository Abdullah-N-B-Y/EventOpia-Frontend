import { User } from "./User";

export interface Payment {
  id?: number | null; 
  paymentDate?: Date | null;
  amount?: number | null; 
  method?: string;
  status?: string;
  userId?: number | null; 
  user?: User | null;
}
