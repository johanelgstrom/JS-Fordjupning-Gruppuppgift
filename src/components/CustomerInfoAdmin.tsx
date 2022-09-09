import { CustomerSearch, TableSearch } from "../models/AdminSearch";
import style from "../scss/EditCustomerBookingButton.module.scss";

interface EditCustomerBookingButtonProps {
  setisEditTable(setisEditTable: boolean): void;
  setIsEditBooking(setIsEditBooking: boolean): void;

  customer: CustomerSearch;
  activeCustomerBooking: TableSearch[];
  setCustomer(setCustomer: CustomerSearch): void;
}

export const CustomerInfoAdmin = (props: EditCustomerBookingButtonProps) => {
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
          <div
            className={style.Info}
            key={props.customer._id}
            id={style.customerInfoAdminInfo}
          >
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
                <button
                  className={style.getInfo}
                  onClick={editTableData}
                  id="getTableButton"
                >
                  Hämta bord
                </button>
                <button
                  className={style.getInfo}
                  onClick={editCustomer}
                  id="changeCustomerButton"
                >
                  Ändra kund info
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
