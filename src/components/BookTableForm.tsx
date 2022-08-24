import { ChangeEvent, useState } from "react";
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
  };

  const handleSeatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeating(event.target.value);
  };

  console.log(seating);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.createBooking(customerInformation, seating);
    setCustomerInformation({ name: "", email: "", phone: "" });
  };

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
