import Calendar from "react-calendar";

import { useEffect, useState } from "react";

import { Header } from "../Header";
import { EditCustomer } from "../EditCustomer";
import {
  Customer,
  CustomerSearch,
  CustomerSearchResponse,
  TableInfo,
  TableSearch,
  TableSearchResponse,
} from "../../models/AdminSearch";
import { EditTableInfo } from "../EditTableInfo";
import styles from "../../scss/Admin.module.scss";

const axios = require("axios");

export const Admin = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [activeCustomerBooking, setActiveCustomerBooking] = useState<
    TableSearch[]
  >([]);
  const [customer, setCustomer] = useState<CustomerSearch[]>([]);

  const [tableData, setTableData] = useState<TableSearch[]>([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/admin/all-bookings" +
          "/" +
          date.toLocaleDateString()
      )
      .then((response: TableSearchResponse) => {
        setTableData(response.data);
        setIsEditable(false);
        if (response.data[0]) {
          const customerBookings = response.data.filter(
            (booking) => booking.customer
          );

          setActiveCustomerBooking(customerBookings);
        } else {
          setCustomer([]);
        }
      });
  }, [date]);

  useEffect(() => {
    const customerBookings = tableData.filter(
      (booking) => booking.customer === customer[0]._id
    );
    setActiveCustomerBooking(customerBookings);
  }, [customer]);

  const updateCustomerData = async (updatedCustomer: Customer) => {
    await axios
      .put(
        "http://localhost:8000/admin/customers/" + customer[0]._id,
        updatedCustomer
      )
      .then((response: CustomerSearch) => {
        console.log("För Customer", response);

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
    console.log("customer id", customerId);

    await axios
      .get("http://localhost:8000/admin/customers/" + customerId)
      .then((Response: CustomerSearchResponse) => {
        console.log("HÄMTAR KUND", Response.data);

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
    if (customer) {
    } else {
      <></>;
    }
  };
  const editTableData = () => {
    setIsEditable(true);
  };

  // const customerBookings = tableData.filter(
  //   (booking) => booking.customer === customer[0]._id
  // );

  return (
    <>
      <main className={styles.mainContainer}>
        <Header />

        <div>
          <Calendar onChange={onChange} value={date} />
        </div>

        {tableData.map((table) => {
          return (
            <div className={styles.customersBookingInfo} key={table._id}>
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

        <p>{message}</p>

        {customer.map((customer) => {
          return (
            <div className={styles.customersBookingInfo} key={customer._id}>
              <div className={styles.customersInfo}>
                <button onClick={editCustomer}>Ändra kund info</button>
                <p>Email:{customer.email}</p>
                <p>Namn:{customer.name}</p>
                <p>Tele:{customer.phone}</p>
                {activeCustomerBooking.map((table) => {
                  return (
                    <div
                      className={styles.customersBookingInfo}
                      key={table._id}
                    >
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

        {isEditable ? (
          <EditCustomer
            customer={customer}
            updateCustomerData={updateCustomerData}
          />
        ) : (
          <></>
        )}
        {isEditable ? (
          <EditTableInfo
            tableInfo={tableData}
            // customer={customer}
            updatedTableInfo={updatedTableInfo}
            // updateCustomerData={updateCustomerData}
          />
        ) : (
          <></>
        )}
      </main>
    </>
  );
};
