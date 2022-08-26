import { TableBooking } from "../models/TableBooking";
import styles from "../scss/Confirmation.module.scss";

interface ConfirmationProps {
  confirmationInformation: TableBooking;
}

export const Confirmation = (props: ConfirmationProps) => {
  return (
    <>
      <div className={styles.confirmationContainer}>
        <div className={styles.textContainer}>
          <h3>Tack {props.confirmationInformation.name} för din bokning!</h3>
          <div>
            <p>
              Du har bokat bord för {props.confirmationInformation.personAmount}{" "}
              personer
            </p>
            <p>
              {props.confirmationInformation.date} klockan{" "}
              {props.confirmationInformation.seating}.
            </p>
            <p>
              En bekräftelse kommer skickas till dig till adressen{" "}
              {props.confirmationInformation.email}.
            </p>
            <p>Vid avbokning klicka på avbokningslänken i bekräftelsemailet</p>
            <p>eller kontakta oss på telefonnummer 0701234567</p>
          </div>
          <p>Med vänlig hälsning MATAD</p>
        </div>
      </div>
    </>
  );
};
