import { useState } from "react";
import { CustomerSearch, TableSearch, Customer } from "../models/AdminSearch";
import style from "../scss/EditCustomerBookingButton.module.scss";

interface EditCustomerBookingButtonProps {
  setisEditTable(setisEditTable: boolean): void;
  setIsEditBooking(setIsEditBooking: boolean): void;

  customer: CustomerSearch;
  activeCustomerBooking: TableSearch;
  setCustomer(setCustomer: CustomerSearch): void;
  //updatedCustomer: CustomerSearch;
}

export const CustomerInfoAdmin = (props: EditCustomerBookingButtonProps) => {
  const [updatedCustomer, setUpdatedCustomer] = useState({
    name: props.customer.name,
    email: props.customer.email,
    phone: props.customer.phone,
  });

  const editCustomer = () => {
    props.setisEditTable(true);
  };
  const editTableData = () => {
    props.setIsEditBooking(true);
  };

  return (
    <>
      <main className={style.mainContainer}>
        <div className={style.container}>
          <div className={style.Info} key={props.customer._id}>
            <div>
              <p>
                <strong>Namn:</strong> {props.customer.name}
              </p>
              <p>
                <strong>Email:</strong> {props.customer.email}
              </p>

              <p>
                <strong>Tele:</strong> {props.customer.phone}
              </p>

              <div className={style.buttons}>
                <button onClick={editTableData}>Ändra kund info</button>
                <button onClick={editCustomer}>Hämta bord</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
