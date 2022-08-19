import axios from "axios";
import { TableBooking } from "../models/TableBooking";

export async function searchTableBooking(date: string, seating: string) {
  console.log("date: ", date);
  console.log("seating: ", seating);

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
