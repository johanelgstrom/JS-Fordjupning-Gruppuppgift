import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "../scss/BookTableForm.module.scss";
import {
  validateAll,
  validateBookingEmail,
  validateBookingName,
  validateBookingPhone,
} from "../validation/validateBookingForm";
import { ValidateSnackBar } from "./ValidateSnackBar";

interface BookTableFormProps {
  newSearch: {
    personAmount: string;
    date: string;
  };
  createBooking(
    customerInformation: {
      name: string;
      email: string;
      phone: string;
    },
    seating: string
  ): void;
  seating: string[];
}

export const BookTableForm = (props: BookTableFormProps) => {
  // STATES
  const [customerInformation, setCustomerInformation] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [seating, setSeating] = useState("");

  const [validateName, setValidateName] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePhone, setValidatePhone] = useState(false);
  const [validateForm, setValidateForm] = useState(false);

  //HANDLE INPUT CHANGES
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerInformation({
      ...customerInformation,
      [event.target.name]: event.target.value,
    });
  };

  // HANDLE SELECT CHANGE
  const handleSeatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeating(event.target.value);
  };

  // HANDLE FORM SUBMIT AND SEND BACK TO BOOK
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      validateAll(
        validateName,
        validateEmail,
        validatePhone,
        customerInformation
      )
    ) {
      props.createBooking(customerInformation, seating);

      setCustomerInformation({ name: "", email: "", phone: "" });
      setValidateForm(false);
    } else {
      setValidateForm(true);
    }
  };

  // CLIENT VALIDATION MESSAGES
  useEffect(() => {
    setValidateName(validateBookingName(customerInformation.name));
    setValidateEmail(validateBookingEmail(customerInformation.email));
    setValidatePhone(validateBookingPhone(customerInformation.phone));
  }, [customerInformation]);

  // OPENS SNACKBAR
  const closeSnackBar = () => {
    setValidateForm(false);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.informationContainer}>
          <div
            className={styles.informationTextContainer}
            id="informationTextContainer"
          >
            <p>Du vill boka bord {props.newSearch.date}</p>
            <p>för {props.newSearch.personAmount} personer</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.labelInputContainer}>
            <label htmlFor="seating">Välj tid</label>
            <select
              name="seating"
              id="seating"
              onChange={handleSeatingChange}
              defaultValue={"default"}
            >
              <option value={"default"}>Välj tid</option>
              {props.seating.map((seating, index) => {
                return (
                  <option key={index} value={seating}>
                    {seating}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.labelInputContainer}>
            <label htmlFor="name">Namn</label>
            <input
              type="text"
              name="name"
              id="name"
              value={customerInformation.name}
              onChange={handleChange}
            />
            {validateName ? (
              <></>
            ) : (
              <p className={styles.validate} id="nameErrorMessage">
                Ditt namn måste vara minst två tecken långt.
              </p>
            )}
          </div>
          <div className={styles.labelInputContainer}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={customerInformation.email}
              onChange={handleChange}
            />
            {validateEmail ? (
              <></>
            ) : (
              <p className={styles.validate} id="emailErrorMessage">
                Skriv in en valid emailadress
              </p>
            )}
          </div>
          <div className={styles.labelInputContainer}>
            <label htmlFor="phone">Telefonnummer</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={customerInformation.phone}
              onChange={handleChange}
            />
            {validatePhone ? (
              <></>
            ) : (
              <p className={styles.validate} id="phoneErrorMessage">
                Skriv in rätt telefonnummerformat: +467********
              </p>
            )}
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            id="submitAllInfoButton"
          >
            Boka
          </button>
        </form>
        {validateForm ? (
          <ValidateSnackBar closeSnackBar={closeSnackBar} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
