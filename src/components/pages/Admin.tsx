// HÄMTAR NPM PACKET react-calendar
import Calendar from "react-calendar";
//  useEffect, useState HÄMTAS FRÅN REACT
import { useEffect, useState } from "react";
// Header EGEN COMPONENT HÄMTAS
import { Header } from "../Header";
//EditCustomer EGEN COMPONENT HÄMTAS
import { EditCustomer } from "../EditCustomer";
// HÄMTAR INFO FRÅN MODELS - adminSearch
import {
  Customer,
  CustomerSearch,
  CustomerSearchResponse,
  TableInfo,
  TableSearch,
  TableSearchResponse,
} from "../../models/AdminSearch";
//EditTableInfo EGEN COMPONENT HÄMTAS
import { EditTableInfo } from "../EditTableInfo";
//MODULE STYLING
import styles from "../../scss/Admin.module.scss";
//CustomerAdmin EGEN COMPONENT HÄMTAS
import { CustomerAdmin } from "../CustomerAdmin";
//CustomerInfoAdmin EGEN COMPONENT HÄMTAS
import { CustomerInfoAdmin } from "../CustomerInfoAdmin";
const axios = require("axios");

export const Admin = () => {
  const [isEditTableBooking, setIsEditBooking] = useState(false);
  const [isEditTable, setisEditTable] = useState(false);
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
  // useEffect  HÄMTAR ALLA BOKNINGAR URL:EN SOM KOMMER FRÅN AdminRouter.js, GÖR OM date TILL EN STRING SOM ANVÄNDS SOM IDENTIFIERING.
  //STARTER OM EFER VARJE NY FÖRÄNDRING MED date.
  // BOOLIANS INNANFÖR ANSVARAR FÖR DESS COMPONENT SKA VARA DÄR ELLER EJ.
  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/admin/all-bookings" +
          "/" +
          date.toLocaleDateString()
      )
      .then((response: TableSearchResponse) => {
        setTableData(response.data);
        setIsEditBooking(false);
        setisEditTable(false);
      });
  }, [date]);

  useEffect(() => {
    const customerBookings = tableData.filter(
      (booking) => booking.customer === customer._id
    );
    setActiveCustomerBooking(customerBookings[0]);
  }, [customer]);

  const getCustomer = async (customerId: string) => {
    console.log("customer id", customerId);

    axios
      .get("http://localhost:8000/admin/customers/" + customerId)
      .then((Response: CustomerSearchResponse) => {
        console.log("HÄMTAR KUND", Response.data);

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

        setisEditTable(false);
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
                    setisEditTable={setisEditTable}
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
