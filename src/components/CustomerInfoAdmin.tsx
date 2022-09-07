import { CustomerSearch, TableSearch, Customer } from "../models/AdminSearch";
import style from "../scss/EditCustomerBookingButton.module.scss";

interface EditCustomerBookingButtonProps {
  setisEditTable(setisEditTable: boolean): void;
  setIsEditBooking(setIsEditBooking: boolean): void;

  customer: CustomerSearch;
  activeCustomerBooking: TableSearch;
  setCustomer(setCustomer: CustomerSearch): void;
}

export const CustomerInfoAdmin = (props: EditCustomerBookingButtonProps) => {
  //HÄMTAR COMPONENTEN SOM UPPDATERAR KUND
  const editCustomer = () => {
    props.setisEditTable(true);
  };
  //HÄMTAR COMPONENTEN SOM UPPDATERAR BORD
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
                <button onClick={editTableData}>Hämta bord</button>
                <button onClick={editCustomer}>Ändra kund info</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
