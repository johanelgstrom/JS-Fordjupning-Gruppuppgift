import styles from "./../scss/Contact.module.scss";
import vid from "./../images/videos/contact-confirm-vid.mp4";

interface IContactProps {
  name: string;
  email: string;
}

export const ContactThanks = (props: IContactProps) => {
  return (
    <>
      <div className={styles.confirmContainer}>
        <div className={styles.confirmTitle}>
          <p id="confirmTitle">Tack {props.name}</p>
        </div>
        <div className={styles.confirmText}>
          <p id="confirmText">
            Vi kontaktar dig så snart som möjligt på {props.email}
          </p>
        </div>
        <div className={styles.confirmVid}>
          <video autoPlay loop muted>
            <source src={vid} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
};
