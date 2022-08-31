import { ChangeEvent } from "react";
import styles from "./../scss/Contact.module.scss";
interface IContactFormProps {
  name: string;
  email: string;
  text: string;
  handleSubmit(e: any): void;
  handleName(e: ChangeEvent<HTMLInputElement>): void;
  handleEmail(e: ChangeEvent<HTMLInputElement>): void;
  handleText(e: ChangeEvent<HTMLTextAreaElement>): void;
}

export const ContactForm = (props: IContactFormProps) => {
  return (
    <>
      <div className={styles.contactTitleContainer}>
        <h3>Fyll i vårt kontaktformulär!</h3>
      </div>
      <div className={styles.contactFormContainer}>
        <form target="_blank" onSubmit={props.handleSubmit}>
          <div className={styles.labelInputContainer}>
            <div className={styles.labelContainer}>
              <p>Namn</p>
            </div>
            <input
              type="text"
              name="name"
              placeholder={props.name}
              onChange={props.handleName}
              id="name"
              required
            />
          </div>
          <div className={styles.labelInputContainer}>
            <div className={styles.labelContainer}>
              <p>Email</p>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={props.email}
              onChange={props.handleEmail}
              required
            />
          </div>
          <div className={styles.labelInputContainer}>
            <textarea
              name="text"
              id="text"
              placeholder={props.text}
              onChange={props.handleText}
              required
            ></textarea>
          </div>

          <button type="submit" id="submitContact">
            Skicka
          </button>
        </form>
      </div>
    </>
  );
};
