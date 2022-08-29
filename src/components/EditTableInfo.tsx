import React, { useState } from "react";
import {
  Customer,
  CustomerSearch,
  TableInfo,
  TableSearch,
} from "../models/AdminSearch";

interface EditTableInfoProps {
  tableInfo: TableSearch[];
  updatedTableInfo(updatedTableInfo: TableInfo): void;
  customer: CustomerSearch[];
  updateCustomerData(updatedCustomer: Customer): void;
}

export const EditTableInfo = (props: EditTableInfoProps) => {
  const [updatedCustomer, setUpdatedCustomer] = useState({
    name: props.customer[0].name,
    email: props.customer[0].email,
    phone: props.customer[0].phone,
  });
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
    e.preventDefault();
    props.updateCustomerData(updatedCustomer);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTableInfo({
      ...updatedTableInfo,
      [e.target.name]: e.target.value,
    });
    setUpdatedCustomer({ ...updatedCustomer, [e.target.name]: e.target.value });
  };

  console.log(updatedTableInfo);

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <label>Namn</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={updatedCustomer.name}
          placeholder="NAMN"
        />
        <label>Mail</label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={updatedCustomer.email}
          placeholder="MAIL"
        />
        <label>Telefon</label>
        <input
          onChange={handleChange}
          type="tel"
          name="phone"
          value={updatedCustomer.phone}
          placeholder="TELEFON"
        />

        <button type="submit">ändra uppgifter </button>
      </form>
    </>
  );
};
