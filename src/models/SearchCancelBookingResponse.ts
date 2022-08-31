import { Booking } from "./Booking";
import { Customer } from "./Customer";

export interface searchCancelBookingResponse {
  booking: Booking;
  customer: Customer;
}
