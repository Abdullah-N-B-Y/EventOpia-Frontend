export interface Bank {
  id?: number;
  cardNumber?: string;
  cardHolder?: string;
  expirationDate?: Date | null; 
  cvv?: string;
  balance?: number | null; 
}
