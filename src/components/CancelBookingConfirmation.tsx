import { HashLink as Link } from "react-router-hash-link";
import styles from "../scss/CancelBookingConfirmation.module.scss";
export const CancelBookingConfirmation = () => {
  return (
    <>
      <div className={styles.container} id="cancelBookingContainer">
        <div className={styles.mainContentContainer}>
          <div className={styles.informationContainer}>
            <div className={styles.informationTextContainer}>
              <h3>Ditt bord är nu avbokat.</h3>
              <p>Klicka på knappen nedan om du vill boka ett nytt.</p>
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
