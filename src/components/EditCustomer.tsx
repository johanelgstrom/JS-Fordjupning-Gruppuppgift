import React, { useState } from "react";
import { Customer, CustomerSearch } from "../models/AdminSearch";
import style from ".././scss/AdminEditCustomer.module.scss";
import { table } from "console";

interface EditCustomerProps {
  customer: CustomerSearch;
  setIsEditBooking(setIsEditBooking: boolean): void;
  updateCustomerData(updatedCustomer: Customer): void;
}
//vad blir functionen av updatedCustomer ? för böt ut inputs Value={updatedCustomer.name} till att map() och ändra value={customer.name}
export const EditCustomer = (props: EditCustomerProps) => {
  const [updatedCustomer, setUpdatedCustomer] = useState({
    name: props.customer.name,
    email: props.customer.email,
    phone: props.customer.phone,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.updateCustomerData(updatedCustomer);

    console.log("här är bolian false i editCustomer");
  };
  console.log("11111 UPPDATED CUSTOMER", updatedCustomer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedCustomer({ ...updatedCustomer, [e.target.name]: e.target.value });
  };

  console.log("2222 UPPDATED CUSTOMER", updatedCustomer);

  return (
    <>
      <main className={style.containerFormCustomer}>
        <div className={style.formCustomer}>
          <form onSubmit={handleSubmit}>
            <div className={style.styleCustomerImputs}>
              <label>
                <strong>Namn:</strong>
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                value={updatedCustomer.name}
              />
              {/* value={updatedCustomer.name} */}
              <label>
                <strong>Email:</strong>
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={updatedCustomer.email}
              />
              <label>
                <strong>Tele:</strong>
              </label>
              <input
                onChange={handleChange}
                type="tel"
                name="phone"
                value={updatedCustomer.phone}
              />
              <button type="submit">ändra uppgifter för kund</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
