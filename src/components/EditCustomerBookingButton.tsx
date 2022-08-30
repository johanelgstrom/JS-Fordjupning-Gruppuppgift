import { CustomerSearch, TableSearch } from "../models/AdminSearch";

interface EditCustomerBookingButtonProps {
  setIsEditableForCustomer(setIsEditableForCustomer: boolean): void;
  setIsEditableForBooking(setIsEditableForBooking: boolean): void;
  customer: CustomerSearch[];
  activeCustomerBooking: TableSearch[];
}

export const EditCustomerBookingButton = (
  props: EditCustomerBookingButtonProps
) => {
  const editCustomer = () => {
    props.setIsEditableForCustomer(true);
  };
  const editTableData = () => {
    props.setIsEditableForBooking(true);
  };
  return (
    <>
      {props.customer.map((customer) => {
        return (
          <div key={customer._id}>
            <div>
              <button onClick={editCustomer}>Ändra kund info</button>
              <p>Email:{customer.email}</p>
              <p>Namn:{customer.name}</p>
              <p>Tele:{customer.phone}</p>
              {props.activeCustomerBooking.map((table) => {
                return (
                  <div key={table._id}>
                    <p>Kund:{table.customer}</p>
                    <p>Datum:{table.date}</p>
                    <p>Vilken sittning:{table.seating}</p>
                    <p>Antal bord:{table.tableamount}</p>
                    <button onClick={editTableData}>Hämta bord</button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
