import axios from "axios";
import { CustomerSearch, TableInfo, TableSearch } from "../models/AdminSearch";
import style from ".././scss/CustomerAdmin.module.scss";
import React from "react";

// PROPSFRÅN ADMIN
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
  return (
    <>
      <main className={style.mainContainer}>
        <div className={style.container}>
          {/* MAPA UT BORDSBOKNINGAR MED KEY={TABLE._ID} */}
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
                  <strong>Antal gäster:</strong> {table.personAmount}
                </p>

                <div className={style.buttons}>
                  {/* HÄMTAR SPECIFICK KUND/BOKNING , FUNCTIONEN FINS I ADMIN */}
                  <button
                    id={style.getCustomerButton}
                    onClick={() => props.getCustomer(table.customer)}
                  >
                    Hämta kund
                  </button>
                  {/* RADERAR SPECIFICK KUND/BOKNING , FUNCTIONEN FINS I ADMIN */}
                  <button
                    id={style.deledeButton}
                    onClick={() => props.deleteBooking(table._id)}
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
