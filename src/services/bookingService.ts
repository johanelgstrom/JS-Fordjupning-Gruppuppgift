import axios from "axios";
import { searchCancelBookingResponse } from "../models/SearchCancelBookingResponse";
import { TableBooking } from "../models/TableBooking";

export async function searchTableBooking(date: string, personAmount: string) {
  return (
    await axios.get(
      "http://localhost:8000/booking/bookings/" + date + "/" + personAmount
    )
  ).data;
}

export async function bookATable(newBooking: TableBooking) {
  return (
    await axios.post("http://localhost:8000/booking/new-booking", newBooking)
  ).data;
}

export async function searchCancelBooking(
  bookingId: string
): Promise<searchCancelBookingResponse> {
  return await (
    await axios.get("http://localhost:8000/booking/cancel/" + bookingId)
  ).data;
}

export async function cancelBooking(bookingId: string) {
  return await axios.delete(
    "http://localhost:8000/booking/cancel/" + bookingId
  );
}
