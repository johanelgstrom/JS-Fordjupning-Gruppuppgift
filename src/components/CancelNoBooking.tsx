import { Link } from "react-router-dom";
import styles from "../scss/CancelNoBooking.module.scss";
interface CancelNoBookingProps {
  message: string;
}
export const CancelNoBooking = (props: CancelNoBookingProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainContentContainer}>
          <div className={styles.informationContainer}>
            <div className={styles.informationTextContainer}>
              <h3>OOPS!</h3>
              <p>Det blev visst något fel.</p>
              <p>Meddelande: {props.message}</p>
              <p>Klicka på knappen nedan om du vill boka.</p>
            </div>
          </div>
        </div>
        <Link to="/book" className={styles.linkTag} id="bookButton">
          <p>Boka</p>
        </Link>
      </div>
    </>
  );
};
