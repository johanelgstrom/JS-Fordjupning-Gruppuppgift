import { send } from "emailjs-com";
import { ChangeEvent, useEffect, useState } from "react";
import { ToSendBook } from "../models/ToSendBook";
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

    setToSend({ ...toSend, [event.target.name]: event.target.value });
  };

  // HANDLE SELECT CHANGE
  const handleSeatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeating(event.target.value);
    let newToSend = { ...toSend };
    newToSend.seating = event.target.value;
    setToSend(newToSend);
  };

  // EMAILJS
  const [serviceId, setServiceId] = useState<string>(
    process.env.REACT_APP_EMAILJS_SERVICE_ID!
  );
  const [templateId, setTemplateId] = useState<string>(
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID!
  );
  const [userId, setUserId] = useState<string>(
    process.env.REACT_APP_EMAILJS_USER_ID!
  );

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
      console.log("Bokat!!");
      setCustomerInformation({ name: "", email: "", phone: "" });
      setValidateForm(false);
      send(serviceId, templateId, toSend, userId)
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
        })
        .catch((err) => {
          console.log("FAILED...", err);
        });
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

  const [toSend, setToSend] = useState<ToSendBook>({
    name: "",
    email: "",
    phone: "",
    date: props.newSearch.date,
    seating: "",
    number: props.newSearch.personAmount,
  });

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.informationContainer}>
          <div className={styles.informationTextContainer}>
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
              <p className={styles.validate}>
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
              <p className={styles.validate}>Skriv in en valid emailadress</p>
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
              <p className={styles.validate}>
                Skriv in rätt telefonnummerformat: +467********
              </p>
            )}
          </div>
          <button type="submit" className={styles.submitButton}>
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
