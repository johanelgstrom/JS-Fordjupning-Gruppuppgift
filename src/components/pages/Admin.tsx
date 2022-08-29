import Calendar from "react-calendar";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { Header } from "../Header";
// import { EditCustomer } from "../EditCustomer";
import {
  Customer,
  CustomerSearch,
  CustomerSearchResponse,
  TableInfo,
  TableSearch,
} from "../../models/AdminSearch";
import { EditTableInfo } from "../EditTableInfo";

const axios = require("axios");

export const Admin = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [customer, setCustomer] = useState<CustomerSearch[]>([]);

  const [tableData, setTableData] = useState<TableSearch[]>([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/admin/all-bookings" +
          "/" +
          date.toLocaleDateString()
      )
      .then((response: AxiosResponse) => {
        setTableData(response.data);
      });
  }, [date]);

  const updateCustomerData = async (updatedCustomer: Customer) => {
    await axios
      .put(
        "http://localhost:8000/admin/customers/" + customer[0]._id,
        updatedCustomer
      )
      .then((response: CustomerSearch) => {
        console.log("För Customer", response);
        // customer.splice(0, 1, response);
        setIsEditable(false);
      });
  };

  const updatedTableInfo = async (updatedTableInfo: TableInfo) => {
    await axios
      .put(
        "http://localhost:8000/admin/bookings/" + tableData[0]._id,
        updatedTableInfo
      )
      .then((response: TableSearch) => {
        console.log("för Table Info", response);
        setIsEditable(false);
      });
  };

  const getCustomer = async (customerId: string) => {
    await axios
      .get("http://localhost:8000/admin/customers/" + customerId)
      .then((Response: CustomerSearchResponse) => {
        console.log("response", Response.data);
        setCustomer(Response.data);
      });
  };

  const onChange = (date: Date) => {
    setDate(date);
  };

  const deleteBooking = async (bookingId: string) => {
    const response = await axios.delete(
      "http://localhost:8000/admin/customers/delete/" + bookingId
    );
    if (response.data.message) {
      setMessage(response.data.message);
      setDate(new Date());
      setCustomer([]);
    }
  };

  const editCustomer = () => {
    setIsEditable(true);
  };
  // const editTableData = () => {
  //   setIsEditable(true);
  // };

  return (
    <>
      <Header />
      <div>
        <Calendar onChange={onChange} value={date} />
      </div>
      {tableData.map((table) => {
        return (
          <div key={table._id}>
            <p>{table.customer}</p>
            <p>{table.date}</p>
            <p>{table.seating}</p>
            <p>{table.tableamount}</p>
            <button onClick={() => getCustomer(table.customer)}>
              Hämta kund
            </button>
            <button onClick={() => deleteBooking(table._id)}>Radera</button>
          </div>
        );
      })}
      <p>{message}</p>
      {customer.map((customer) => {
        return (
          <div key={customer._id}>
            <p>{customer.email}</p>
            <p>{customer.name}</p>
            <p>{customer.phone}</p>

            {tableData.map((tableData) => {
              return (
                <div key={tableData._id}>
                  <p>{tableData.date}</p>
                  <p>{tableData.customer}</p>
                  <p>{tableData.personAmount}</p>
                  <p>{tableData.seating}</p>
                  <p>{tableData.tableamount}</p>
                  <button onClick={editCustomer}>Ändra kund info</button>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* {isEditable ? (
        <EditCustomer
          customer={customer}
          updateCustomerData={updateCustomerData}
        />
      ) : (
        <></>
      )} */}
      {isEditable ? (
        <EditTableInfo
          tableInfo={tableData}
          customer={customer}
          updatedTableInfo={updatedTableInfo}
          updateCustomerData={updateCustomerData}
        />
      ) : (
        <></>
      )}
    </>
  );
};
