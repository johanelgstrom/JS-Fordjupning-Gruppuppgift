import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import { Customer } from "../../models/Customer";
import {
  cancelBooking,
  searchCancelBooking,
} from "../../services/bookingService";
import { CancelBookingInformation } from "../CancelBookingInformation";
import { Header } from "../Header";
import styles from "../../scss/CancelBooking.module.scss";
import { CancelBookingConfirmation } from "../CancelBookingConfirmation";
import { Loader } from "../Loader";
import { CancelNoBooking } from "../CancelNoBooking";

type IdParams = {
  id: string;
};

export const CancelBooking = () => {
  const params = useParams<IdParams>();
  //STATES
  const [booking, setBooking] = useState<Booking>({
    _id: "",
    date: "",
    seating: "",
    personAmount: "",
    tableAmount: "",
    customer: "",
  });
  const [customer, setCustomer] = useState<Customer>({
    _id: "",
    name: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [noBooking, setNoBooking] = useState(false);

  //GET TABLEBOOKING FROM URLSTRING (PARAMS)
  useEffect(() => {
    if (params.id!) {
      setIsLoading(true);
      searchCancelBooking(params.id!)
        .then((data) => {
          if (data.message === "Success") {
            setIsLoading(false);
            setBooking(data.booking);
            setCustomer(data.customer);
          } else {
            setIsLoading(false);
            setNoBooking(true);
            setMessage(data.message);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  }, [params]);

  // DELETE BOOKING
  const handleCancellation = () => {
    if (params.id!) {
      setIsLoading(true);
      cancelBooking(params.id)
        .then((response) => {
          if (response.data.message === "Deleted") {
            setIsLoading(false);
            setIsDeleted(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.heroContainer}>
          <Header />
          {isLoading ? (
            <Loader />
          ) : noBooking ? (
            <CancelNoBooking message={message} />
          ) : isDeleted ? (
            <CancelBookingInformation
              customer={customer}
              booking={booking}
              handleCancellation={handleCancellation}
            />
          ) : (
            <CancelBookingConfirmation />
          )}
        </div>
      </main>
    </>
  );
};
