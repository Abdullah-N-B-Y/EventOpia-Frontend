import { Bank } from "../Data/Bank";

export interface PaymentDetailsDTO {
    userId?: number;
    eventId?: number | null;
    paymentAmount?: number | null;
    bank?: Bank | null;
}
