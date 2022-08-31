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

type IdParams = {
  id: string;
};

export const CancelBooking = () => {
  const params = useParams<IdParams>();
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
  const [isDeleted, setIsDeleted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params.id!) {
      setIsLoading(true);
      searchCancelBooking(params.id!)
        .then((data) => {
          setIsLoading(false);
          setBooking(data.booking);
          setCustomer(data.customer);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [params]);

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
