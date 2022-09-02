import React, { useState } from "react";
import { TableInfo, TableSearch } from "../models/AdminSearch";
import style from ".././scss/AdminEditTable.module.scss";

interface EditTableInfoProps {
  tableInfo: TableSearch;
  updatedTableInfo(updatedTableInfo: TableInfo): void;
  setisEditTable(setisEditTable: boolean): void;
}

export const EditTableInfo = (props: EditTableInfoProps) => {
  const [updatedTableInfo, setUpdatedTableInfo] = useState({
    date: props.tableInfo.date,
    seating: props.tableInfo.seating,
    personAmount: props.tableInfo.personAmount,
    tableamount: props.tableInfo.tableamount,
    customer: props.tableInfo.customer,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.updatedTableInfo(updatedTableInfo);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTableInfo({
      ...updatedTableInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUpdatedTableInfo({
      ...updatedTableInfo,
      [e.target.name]: e.target.value,
    });
  };

  console.log(updatedTableInfo);

  return (
    <>
      <main className={style.containerFormTable}>
        <div className={style.formTable}>
          <form onSubmit={handleSubmit}>
            <div className={style.styleTableImputs}>
              <label>
                <strong>Datum:</strong>
              </label>
              <input
                onChange={handleChange}
                type="date"
                name="date"
                value={updatedTableInfo.date}
              />
              <label>
                <strong>Sittning:</strong>
              </label>
              <select
                onChange={handleSelect}
                name="seating"
                value={updatedTableInfo.seating}
              >
                <option>Välj sittning</option>

                <option>18:00</option>
                <option>21:00</option>
              </select>

              <label>
                <strong>Kund id:</strong>
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="customer"
                value={updatedTableInfo.customer}
              />

              <button type="submit">ändra uppgifter </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
