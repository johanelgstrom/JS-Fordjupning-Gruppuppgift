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
        <div>
          <p>Du vill boka bord {props.newSearch.date}</p>
          <p>
            för {props.newSearch.personAmount} personer, {/* time */}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
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
          <label htmlFor="name">Namn</label>
          <input
            type="text"
            name="name"
            id="name"
            value={customerInformation.name}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={customerInformation.email}
            onChange={handleChange}
          />
          <label htmlFor="phone">Telefonnummer</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={customerInformation.phone}
            onChange={handleChange}
          />
          <button type="submit">Boka</button>
        </form>
      </div>
    </>
  );
};
