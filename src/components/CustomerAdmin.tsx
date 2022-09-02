import axios from "axios";
import {
  CustomerSearch,
  CustomerSearchResponse,
  TableInfo,
  TableSearch,
} from "../models/AdminSearch";
import style from ".././scss/TableDataMap.module.scss";
import React from "react";

interface TableDataMapProps {
  tableInfo: TableSearch[];
  customer: CustomerSearch;
  message: string;

  updatedTableInfo(updatedTableInfo: TableInfo): void;
  setCustomer(setCustomer: CustomerSearch): void;
  setMessage(setMessage: ""): void;
  setDate(setDate: Date): void;
  getCustomer(getCustomer: string): void;
  deleteBooking(deleteBooking: string): void;
}

export const CustomerAdmin = (props: TableDataMapProps) => {
  // const getCustomer = async (customerId: string) => {
  //   console.log("customer id", customerId);

  //   await axios
  //     .get("http://localhost:8000/admin/customers/" + customerId)
  //     .then((Response: CustomerSearchResponse) => {
  //       console.log("HÄMTAR KUND", Response.data);

  //       props.setCustomer(Response.data);
  //     });
  // };
  // const deleteBooking = async (bookingId: string) => {
  //   const response = await axios.delete(
  //     "http://localhost:8000/admin/customers/delete/" + bookingId
  //   );
  //   if (response.data.message) {
  //     props.setMessage(response.data.message);
  //     props.setDate(new Date());
  //     props.setCustomer([]);
  //   }
  // };

  return (
    <>
      <main className={style.mainContainer}>
        <div className={style.container}>
          {props.tableInfo.map((table) => {
            return (
              <div className={style.Info} key={table._id}>
                <p>
                  <strong>Kund id:</strong> {table.customer}
                </p>
                <p>
                  <strong>Datum:</strong> {table.date}
                </p>
                <p>
                  <strong>Vilken sittning:</strong> {table.seating}
                </p>
                <p>
                  <strong>Antal bord:</strong> {table.tableamount}
                </p>
                <div className={style.buttons}>
                  <button onClick={() => props.getCustomer(table.customer)}>
                    Hämta kund
                  </button>

                  <button onClick={() => props.deleteBooking(table._id)}>
                    Radera
                  </button>
                </div>
              </div>
            );
          })}

          {/* <p>{props.message}</p> */}
        </div>
      </main>
    </>
  );
};
