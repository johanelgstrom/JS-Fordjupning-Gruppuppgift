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

  updatedTableInfo(updatedTableInfo: TableInfo, customerId: string): void;
  setCustomer(setCustomer: CustomerSearch): void;
  setMessage(setMessage: ""): void;
  setDate(setDate: Date): void;
  getCustomer(getCustomer: string, tableId: string): void;
  deleteBooking(deleteBooking: string): void;
}

export const CustomerAdmin = (props: TableDataMapProps) => {
  return (
    <>
      <main className={style.mainContainer}>
        <div className={style.container}>
          {props.tableInfo.map((table) => {
            return (
              <div className={style.Info} key={table._id} id="infoTable">
                <p>
                  <strong>Kund id:</strong> {table.customer}
                </p>
                <p>
                  <strong>Boknings id: {table._id}</strong>
                </p>
                <p>
                  <strong>Datum:</strong> {table.date}
                </p>
                <p>
                  <strong>Vilken sittning:</strong> {table.seating}
                </p>
                <p>
                  <strong>Antal personer:</strong> {table.personAmount}
                </p>
                <div className={style.buttons} id="buttonGroup">
                  <button
                    onClick={() => props.getCustomer(table.customer, table._id)}
                    id="getCustomerButton"
                  >
                    Hämta kund
                  </button>

                  <button
                    onClick={() => props.deleteBooking(table._id)}
                    id="deleteButton"
                  >
                    Radera
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};
