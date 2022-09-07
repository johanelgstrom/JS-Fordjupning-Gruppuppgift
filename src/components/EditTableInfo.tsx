import React, { useEffect, useState } from "react";
import { TableInfo, TableSearch } from "../models/AdminSearch";
import style from ".././scss/AdminEditTable.module.scss";
import { validateDate } from "../validation/validateAdminTable";

interface EditTableInfoProps {
  tableInfo: TableSearch;
  updatedTableInfo(updatedTableInfo: TableInfo): void;
  setisEditTable(setisEditTable: boolean): void;
}
//ÅTERANVÄNDER INFORMATION FRÅN Admin COMPONENTEN
export const EditTableInfo = (props: EditTableInfoProps) => {
  const [updatedTableInfo, setUpdatedTableInfo] = useState({
    date: props.tableInfo.date,
    seating: props.tableInfo.seating,
    personAmount: props.tableInfo.personAmount,
    tableamount: props.tableInfo.tableamount,
    customer: props.tableInfo.customer,
  });
  // BOOLIAN SOM BEKRÄFTAR OM VALIDERINGEN BEHÖVS
  const [dateValidate, setDateValidate] = useState(false);
  //BERÄTTAR OM VALIDERINGEN ÄR SOM DEN SKA NOLLSTÄLL updatedTableInfo
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dateValidate) {
      props.updatedTableInfo(updatedTableInfo);
      setUpdatedTableInfo({
        date: "",
        seating: "",
        personAmount: "",
        tableamount: "",
        customer: "",
      });
    }
  };

  // VALIDERING SKER NÄR FÖRÄNDRING AV updatedCustomer
  useEffect(() => {
    setDateValidate(validateDate(updatedTableInfo.date));
  }, [updatedTableInfo]);
  //UPPDATERAR DET NYA VÄRDET I FORMULÄRET INNANFÖR INPUTELEMENTET
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTableInfo({
      ...updatedTableInfo,
      [e.target.name]: e.target.value,
    });
  };
  //UPPDATERAR DET NYA VÄRDET I FORMULÄRET INNANFÖR SELECTELEMENTET
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
              {dateValidate ? <></> : <p>klicka i ett datum</p>}

              <label>
                <strong>Antal gäster:</strong>
              </label>
              <select
                onChange={handleSelect}
                name="personAmount"
                value={updatedTableInfo.personAmount}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
              <label>
                <strong>Sittning:</strong>
              </label>
              <select
                onChange={handleSelect}
                name="seating"
                value={updatedTableInfo.seating}
              >
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
                readOnly
              />

              <button type="submit">ändra uppgifter </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
