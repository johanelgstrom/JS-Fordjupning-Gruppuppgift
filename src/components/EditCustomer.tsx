import React, { useEffect, useState } from "react";
import { Customer, CustomerSearch } from "../models/AdminSearch";
import style from ".././scss/AdminEditCustomer.module.scss";

import {
  validateAll,
  validateBookingEmail,
  validateBookingName,
  validateBookingPhone,
} from "../validation/validationAdminCustomer";

interface EditCustomerProps {
  customer: CustomerSearch;
  setIsEditBooking(setIsEditBooking: boolean): void;
  updateCustomerData(updatedCustomer: Customer): void;
}
//ÅTERANVÄNDER INFORMATION FRÅN Admin COMPONENTEN
export const EditCustomer = (props: EditCustomerProps) => {
  const [updatedCustomer, setUpdatedCustomer] = useState({
    name: props.customer.name,
    email: props.customer.email,
    phone: props.customer.phone,
  });
  // BOOLIAN SOM BEKRÄFTAR OM VALIDERINGEN BEHÖVS
  const [validateName, setValidateName] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePhone, setValidatePhone] = useState(false);

  //BERÄTTAR OM VALIDERINGEN ÄR SOM DEN SKA NOLLSTÄLL updatedCustomer
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      validateAll(validateName, validateEmail, validatePhone, updatedCustomer)
    ) {
      props.updateCustomerData(updatedCustomer);
      setUpdatedCustomer({ name: "", email: "", phone: "" });
      console.log("här är bolian false i editCustomer", updatedCustomer);
    }
  };
  // VALIDERING SKER NÄR FÖRÄNDRING AV updatedCustomer
  useEffect(() => {
    setValidateName(validateBookingName(updatedCustomer.name));
    setValidateEmail(validateBookingEmail(updatedCustomer.email));
    setValidatePhone(validateBookingPhone(updatedCustomer.phone));
  }, [updatedCustomer]);
  console.log("11111 UPPDATED CUSTOMER", updatedCustomer);

  //UPPDATERAR DET NYA VÄRDET I FORMULÄRET
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
              {validateName ? (
                <></>
              ) : (
                <p>Ditt namn måste vara minst två tecken långt.</p>
              )}

              <label>
                <strong>Email:</strong>
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={updatedCustomer.email}
              />
              {validateEmail ? <></> : <p>Skriv in en valid emailadress</p>}
              <label>
                <strong>Tele:</strong>
              </label>
              <input
                onChange={handleChange}
                type="tel"
                name="phone"
                value={updatedCustomer.phone}
              />
              {validatePhone ? (
                <></>
              ) : (
                <p>Skriv in rätt telefonnummerformat: +467********</p>
              )}
              <button type="submit">ändra uppgifter för kund</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
