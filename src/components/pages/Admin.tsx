import Calendar from "react-calendar";

import { useEffect, useState } from "react";

import { Header } from "../Header";
import { EditCustomer } from "../EditCustomer";
import {
  Customer,
  CustomerSearch,
  CustomerSearchResponse,
  TableAmountSum,
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
  const [isEditTableBooking, setIsEditBooking] = useState(false);
  const [isEditTable, setisEditTable] = useState(false);
  const [getCustomerInfo, setGetCustomerInfo] = useState(false);
  const [isBookable, setIsBookable] = useState(true);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [activeCustomerBooking, setActiveCustomerBooking] = useState<
    TableSearch[]
  >([]);
  const [customer, setCustomer] = useState<CustomerSearch>({
    _id: "",
    name: "",
    phone: "",
    email: "",
  });

  const [tableData, setTableData] = useState<TableSearch[]>([]);

  const [tableAmountSum, setTableAmountSum] = useState<TableAmountSum>({
    tableSumSeatingOne: 0,
    tableSumSeatingTwo: 0,
  });

  const [activeTable, setActiveTable] = useState<TableSearch>({
    _id: "",
    date: "",
    seating: "",
    personAmount: "",
    tableAmount: "",
    customer: "",
  });
  const [tableId, setTableId] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/admin/all-bookings" +
          "/" +
          date.toLocaleDateString()
      )
      .then((response: TableSearchResponse) => {
        setTableData(response.data.bookingsByDate);
        setTableAmountSum(response.data);
        setIsEditBooking(false);
        setisEditTable(false);
      });
  }, [date]);

  useEffect(() => {
    const customerBookings = tableData.filter(
      (booking) => booking.customer === customer._id
    );

    setActiveCustomerBooking(customerBookings);
  }, [customer]);

  useEffect(() => {
    const table = activeCustomerBooking.filter(
      (table) => table._id === tableId
    );
    setActiveTable(table[0]);
  }, [activeCustomerBooking, tableId]);

  const getCustomer = async (customerId: string, tableId: string) => {
    axios
      .get("http://localhost:8000/admin/customers/" + customerId)
      .then((Response: CustomerSearchResponse) => {
        setTableId(tableId);
        setCustomer(Response.data[0]);
        setGetCustomerInfo(true);
        setisEditTable(false);
        setIsEditBooking(false);
      });
  };

  const deleteBooking = async (bookingId: string) => {
    const response = await axios.delete(
      "http://localhost:8000/admin/customers/delete/" + bookingId
    );
    if (response.data.message) {
      setMessage(response.data.message);
    }
    setGetCustomerInfo(false);
    setIsEditBooking(false);
    setDate(new Date());
  };

  const updateCustomerData = async (updatedCustomer: Customer) => {
    await axios
      .put(
        "http://localhost:8000/admin/customers/" + customer._id,
        updatedCustomer
      )
      .then((response: CustomerSearch) => {
        setisEditTable(false);
      });
  };

  const updatedTableInfo = async (
    updatedTableInfo: TableInfo,
    bookingId: string
  ) => {
    console.log("updatedTableInfo axios: ", updatedTableInfo);

    await axios
      .put(
        "http://localhost:8000/admin/bookings/" + bookingId,
        updatedTableInfo
      )
      .then((response: TableSearch) => {
        setIsEditBooking(false);
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
                    setisEditTable={setisEditTable}
                    setIsEditBooking={setIsEditBooking}
                    customer={customer}
                    setCustomer={setCustomer}
                    activeCustomerBooking={activeCustomerBooking}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.edit}>
                {isEditTable ? (
                  <EditCustomer
                    setIsEditBooking={setIsEditBooking}
                    customer={customer}
                    updateCustomerData={updateCustomerData}
                  />
                ) : (
                  <></>
                )}
              </div>

              <div className={styles.edit}>
                {isEditTableBooking ? (
                  <EditTableInfo
                    tableAmountSum={tableAmountSum}
                    setisEditTable={setisEditTable}
                    tableInfo={activeTable}
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
