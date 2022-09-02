import styles from "../scss/CancelBookingInformation.module.scss";
import { Booking } from "../models/Booking";
import { Customer } from "../models/Customer";

interface CancelBookingInformationProps {
  booking: Booking;
  customer: Customer;
  handleCancellation(): void;
}

export const CancelBookingInformation = (
  props: CancelBookingInformationProps
) => {
  const handleClick = () => {
    props.handleCancellation();
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainContentContainer}>
          <div className={styles.informationContainer}>
            <div className={styles.informationTextContainer}>
              <h3>Hej {props.customer.name}!</h3>
              <p> om du vill avboka ditt bord</p>
              <p>
                för {props.booking.personAmount} personer, {props.booking.date}.
              </p>
              <p>Var vänlig klicka på knappen under.</p>
            </div>
          </div>
        </div>
        <button onClick={handleClick}>Avboka</button>
      </div>
    </>
  );
};
