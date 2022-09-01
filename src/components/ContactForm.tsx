import { ChangeEvent, useEffect, useState } from "react";
import styles from "./../scss/Contact.module.scss";
import {
  validateContactEmail,
  validateContactName,
  validateMessage,
} from "../validation/validateContactForm";
interface IContactFormProps {
  name: string;
  email: string;
  text: string;
  handleSubmit(e: any): void;
  handleName(e: ChangeEvent<HTMLInputElement>): void;
  handleEmail(e: ChangeEvent<HTMLInputElement>): void;
  handleText(e: ChangeEvent<HTMLTextAreaElement>): void;
  validateName: boolean;
  validateEmail: boolean;
  validateMessage: boolean;
  setValidateName: React.Dispatch<React.SetStateAction<boolean>>;
  setValidateEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setValidateMessage: React.Dispatch<React.SetStateAction<boolean>>;
  messageError: boolean;
  setMessageError: React.Dispatch<React.SetStateAction<boolean>>;
  isNameEmpty: boolean;
  isEmailEmpty: boolean;
}

export const ContactForm = (props: IContactFormProps) => {
  // Skickar namnet vidare för validering och godkänt
  useEffect(() => {
    let checkIfValid: boolean = validateContactName(props.name);
    if (checkIfValid === true) {
      props.setValidateName(true);
    } else {
      props.setValidateName(false);
    }
  }, [props.name]);
  // Skickar emailet vidare för validering och godkänt
  useEffect(() => {
    let checkIfValid: boolean = validateContactEmail(props.email);
    if (checkIfValid === true) {
      props.setValidateEmail(true);
    } else {
      props.setValidateEmail(false);
    }
  }, [props.email]);
  // Skickar meddelandet vidare för validering och godkänt
  useEffect(() => {
    let checkIfValid: boolean = validateMessage(
      props.text,
      props.setMessageError
    );
    if (checkIfValid === true) {
      props.setValidateMessage(true);
    } else {
      props.setValidateMessage(false);
    }
  }, [props.text]);
  return (
    <>
      <div className={styles.contactTitleContainer}>
        <h3>Fyll i vårt kontaktformulär!</h3>
      </div>
      <div className={styles.contactFormContainer}>
        <form target="_blank" onSubmit={props.handleSubmit} noValidate>
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
          {props.isNameEmpty ? ( //Kollar om namnet är tomt
            <></>
          ) : (
            <>
              {props.validateName ? ( //Om namnet inte går igenom valideringen kommer ett felmeddelande upp
                <></>
              ) : (
                <p className={styles.errorText}>Skriv in ditt namn</p>
              )}
            </>
          )}

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
          {props.isEmailEmpty ? ( //Kollar om emailet är tomt
            <></>
          ) : (
            <>
              {props.validateEmail ? ( //Om emailet inte går igenom valideringen kommer ett felmeddelande upp
                <></>
              ) : (
                <p className={styles.errorText}>
                  Skriv in en korrekt emailadress
                </p>
              )}
            </>
          )}
          <div className={styles.labelInputContainer}>
            <textarea
              name="text"
              id="text"
              placeholder={props.text}
              onChange={props.handleText}
              required
            ></textarea>
          </div>
          {props.messageError ? ( //Om meddelandet inte går igenom valideringen vid knapptryck kommer ett felmeddelande upp
            <p className={styles.errorText}>Skriv ett meddelande</p>
          ) : (
            <></>
          )}
          <button type="submit" id="submitContact">
            Skicka
          </button>
        </form>
      </div>
    </>
  );
};
