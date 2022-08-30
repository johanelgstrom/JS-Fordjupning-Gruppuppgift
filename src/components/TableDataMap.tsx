import axios from "axios";
import {
  CustomerSearch,
  CustomerSearchResponse,
  TableInfo,
  TableSearch,
} from "../models/AdminSearch";

interface TableDataMapProps {
  tableInfo: TableSearch[];
  customer: CustomerSearch[];
  message: string;
  updatedTableInfo(updatedTableInfo: TableInfo): void;
  setCustomer(setCustomer: CustomerSearch[]): void;
  setMessage(setMessage: ""): void;
  setDate(setDate: Date): void;
}

export const TableDataMap = (props: TableDataMapProps) => {
  const getCustomer = async (customerId: string) => {
    console.log("customer id", customerId);

    await axios
      .get("http://localhost:8000/admin/customers/" + customerId)
      .then((Response: CustomerSearchResponse) => {
        console.log("HÄMTAR KUND", Response.data);

        props.setCustomer(Response.data);
      });
  };
  const deleteBooking = async (bookingId: string) => {
    const response = await axios.delete(
      "http://localhost:8000/admin/customers/delete/" + bookingId
    );
    if (response.data.message) {
      props.setMessage(response.data.message);
      props.setDate(new Date());
      props.setCustomer([]);
    }
  };

  return (
    <>
      <main>
        <div>
          {props.tableInfo.map((table) => {
            return (
              <div key={table._id}>
                <p>Kund:{table.customer}</p>
                <p>Datum:{table.date}</p>
                <p>Vilken sittning:{table.seating}</p>
                <p>Antal bord:{table.tableamount}</p>
                <button onClick={() => getCustomer(table.customer)}>
                  Hämta kund
                </button>

                <button onClick={() => deleteBooking(table._id)}>Radera</button>
              </div>
            );
          })}

          <p>{props.message}</p>
        </div>
      </main>
    </>
  );
};
