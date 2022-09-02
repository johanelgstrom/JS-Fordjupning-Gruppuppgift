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

import { CustomerAdmin } from "../CustomerAdmin";
import { CustomerInfoAdmin } from "../CustomerInfoAdmin";

const axios = require("axios");

export const Admin = () => {
  const [isEditableForBooking, setIsEditableForBooking] = useState(false);
  const [isEditableForCustomer, setIsEditableForCustomer] = useState(false);
  const [getCustomerInfo, setGetCustomerInfo] = useState(false);
  const [isBookable, setIsBookable] = useState(true);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [activeCustomerBooking, setActiveCustomerBooking] =
    useState<TableSearch>({
      _id: "",
      date: "",
      seating: "",
      personAmount: "",
      tableamount: "",
      customer: "",
    });
  const [customer, setCustomer] = useState<CustomerSearch>({
    _id: "",
    name: "",
    phone: "",
    email: "",
  });

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
        setIsEditableForBooking(false);
        setIsEditableForCustomer(false);
        // if (response.data[0]) {
        //   const customerBookings = response.data.filter(
        //     (booking) => booking.customer === customer[0]._id
        //   );

        //   setActiveCustomerBooking(customerBookings);
        // } else {
        //   setCustomer([]);
        // }
      });
  }, [date]);

  useEffect(() => {
    const customerBookings = tableData.filter(
      (booking) => booking.customer === customer._id
    );
    setActiveCustomerBooking(customerBookings[0]);
  }, [customer]);

  // la till från CustomerAdmin
  const getCustomer = async (customerId: string) => {
    console.log("customer id", customerId);

    axios
      .get("http://localhost:8000/admin/customers/" + customerId)
      .then((Response: CustomerSearchResponse) => {
        console.log("HÄMTAR KUND", Response.data);

        setCustomer(Response.data[0]);
        setGetCustomerInfo(true);
        setIsEditableForCustomer(false);
        setIsEditableForBooking(false);
      });
  };

  //La till från CustomerAdmin
  const deleteBooking = async (bookingId: string) => {
    const response = await axios.delete(
      "http://localhost:8000/admin/customers/delete/" + bookingId
    );
    if (response.data.message) {
      setMessage(response.data.message);
      setGetCustomerInfo(false);
    }
    setDate(new Date());
    setCustomer({
      _id: "",
      name: "",
      phone: "",
      email: "",
    });
    console.log("DELEDEDBOOKING", response.data);
  };

  const updateCustomerData = async (updatedCustomer: Customer) => {
    await axios
      .put(
        "http://localhost:8000/admin/customers/" + customer._id,
        updatedCustomer
      )
      .then((response: CustomerSearch) => {
        console.log("För Customer", response);

        setIsEditableForCustomer(false);
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
        setIsEditableForBooking(false);
      });
  };

  const onChange = (date: Date) => {
    setDate(date);
    setIsBookable(false);
    setGetCustomerInfo(false);
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.heroContainer}>
          <Header />
          <div className={styles.mainContentContainer}>
            <div className={styles.calender}>
              <Calendar onChange={onChange} value={date} />
            </div>

            <div className={styles.makeContentHorizontalAndVertical}>
              <div>
                <CustomerAdmin
                  tableInfo={tableData}
                  customer={customer}
                  message={message}
                  updatedTableInfo={updatedTableInfo}
                  setMessage={setMessage}
                  setDate={setDate}
                  getCustomer={getCustomer}
                  deleteBooking={deleteBooking}
                  setCustomer={setCustomer}
                />
              </div>
              <div>
                {getCustomerInfo ? (
                  <CustomerInfoAdmin
                    setIsEditableForCustomer={setIsEditableForCustomer}
                    setIsEditableForBooking={setIsEditableForBooking}
                    customer={customer}
                    setCustomer={setCustomer}
                    activeCustomerBooking={activeCustomerBooking}
                  />
                ) : (
                  <></>
                )}
              </div>

              <div className={styles.edit}>
                {isEditableForBooking ? (
                  <EditCustomer
                    customer={customer}
                    updateCustomerData={updateCustomerData}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.edit}>
                {isEditableForCustomer ? (
                  <EditTableInfo
                    tableInfo={activeCustomerBooking}
                    updatedTableInfo={updatedTableInfo}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
