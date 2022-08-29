import React, { useState } from "react";
import { Customer, CustomerSearch } from "../models/AdminSearch";

interface EditCustomerProps {
  customer: CustomerSearch[];
  updateCustomerData(updatedCustomer: Customer): void;
}

export const EditCustomer = (props: EditCustomerProps) => {
  const [updatedCustomer, setUpdatedCustomer] = useState({
    name: props.customer[0].name,
    email: props.customer[0].email,
    phone: props.customer[0].phone,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.updateCustomerData(updatedCustomer);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedCustomer({ ...updatedCustomer, [e.target.name]: e.target.value });
  };

  console.log(updatedCustomer);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={updatedCustomer.name}
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={updatedCustomer.email}
        />
        <input
          onChange={handleChange}
          type="tel"
          name="phone"
          value={updatedCustomer.phone}
        />

        <button type="submit">ändra uppgifter för kund</button>
      </form>
    </>
  );
};
