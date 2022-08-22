import { ChangeEvent, useState } from "react";

interface BookTableFormProps {
  newSearch: {
    personAmount: string;
    seating: string;
    date: string;
  };
  createBooking(customerInformation: {
    name: string;
    email: string;
    phone: string;
  }): void;
}

export const BookTableForm = (props: BookTableFormProps) => {
  const [customerInformation, setCustomerInformation] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerInformation({
      ...customerInformation,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.createBooking(customerInformation);
    setCustomerInformation({ name: "", email: "", phone: "" });
  };

  let time = props.newSearch.seating;
  if (time === "1") {
    time = "18.00";
  } else {
    time = "21.00";
  }
  return (
    <>
      <div>
        <p>Du vill boka bord {props.newSearch.date}</p>
        <p>
          för {props.newSearch.personAmount} personer, {time}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
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
    </>
  );
};
