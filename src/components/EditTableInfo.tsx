import React, { useState } from "react";
import {
  Customer,
  CustomerSearch,
  TableInfo,
  TableSearch,
} from "../models/AdminSearch";
import style from ".././scss/AdminEditTable.module.scss";

interface EditTableInfoProps {
  tableInfo: TableSearch[];
  updatedTableInfo(updatedTableInfo: TableInfo): void;
}

export const EditTableInfo = (props: EditTableInfoProps) => {
  const [updatedTableInfo, setUpdatedTableInfo] = useState({
    date: props.tableInfo[0].date,
    seating: props.tableInfo[0].seating,
    personAmount: props.tableInfo[0].personAmount,
    tableamount: props.tableInfo[0].tableamount,
    customer: props.tableInfo[0].customer,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.updatedTableInfo(updatedTableInfo);
    // e.preventDefault();
    // props.updateCustomerData(updatedCustomer);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTableInfo({
      ...updatedTableInfo,
      [e.target.name]: e.target.value,
    });
    // setUpdatedCustomer({ ...updatedCustomer, [e.target.name]: e.target.value });
  };

  console.log(updatedTableInfo);

  return (
    <>
      <main className={style.containerFormTable}>
        <div className={style.formTable}>
          <form onSubmit={handleSubmit}>
            <div className={style.styleTableImputs}>
              <label>Datum</label>
              <input
                onChange={handleChange}
                type="date"
                name="date"
                value={updatedTableInfo.date}
                placeholder="DATUM"
              />
              <label>Sittning</label>
              <input
                onChange={handleChange}
                type="text"
                name="seating"
                value={updatedTableInfo.seating}
                placeholder="SITTNING"
              />
              <label>Antal Bord</label>
              <input
                onChange={handleChange}
                type="number"
                name="tableamount"
                value={updatedTableInfo.tableamount}
                placeholder="ANTAL BORD"
              />
              <label>Kund</label>
              <input
                onChange={handleChange}
                type="text"
                name="customer"
                value={updatedTableInfo.customer}
                placeholder="KUNDER"
              />

              <button type="submit">ändra uppgifter </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
