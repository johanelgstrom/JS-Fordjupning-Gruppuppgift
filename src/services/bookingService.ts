import axios from "axios";
import { TableBooking } from "../models/TableBooking";

export async function searchTableBooking(date: string, seating: string) {
  return (
    await axios.get(
      "http://localhost:8000/booking/bookings/" + date + "/" + seating
    )
  ).data;
}

export async function bookATable(newBooking: TableBooking) {
  return (
    await axios.post("http://localhost:8000/booking/new-booking", newBooking)
  ).data;
}
