import { send } from "emailjs-com";
import { ChangeEvent, useState } from "react";
import { ToSend } from "../models/ToSend";
import styles from "../scss/BookTableForm.module.scss";

interface BookTableFormProps {
  newSearch: {
    personAmount: string;
    /* seating: string; */
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
  const [customerInformation, setCustomerInformation] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [seating, setSeating] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerInformation({
      ...customerInformation,
      [event.target.name]: event.target.value,
    });
    setToSend({ ...toSend, [event.target.name]: event.target.value });
  };

  const handleSeatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeating(event.target.value);
    let newToSend = { ...toSend };
    newToSend.seating = event.target.value;
    setToSend(newToSend);
  };

  console.log(seating);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.createBooking(customerInformation, seating);
    setCustomerInformation({ name: "", email: "", phone: "" });
    send(serviceId, templateId, toSend, userId)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  const [toSend, setToSend] = useState<ToSend>({
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
            <p>
              för {props.newSearch.personAmount} personer, {/* time */}
            </p>
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
          </div>
          <button type="submit" className={styles.submitButton}>
            Boka
          </button>
        </form>
      </div>
    </>
  );
};
