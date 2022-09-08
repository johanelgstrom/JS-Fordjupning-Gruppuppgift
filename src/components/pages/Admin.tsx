// HÄMTAR NPM PACKET react-calendar
import Calendar from "react-calendar";
//  useEffect, useState HÄMTAS FRÅN REACT
import { useEffect, useState } from "react";
// Header COMPONENT HÄMTAS
import { Header } from "../Header";
//EditCustomer COMPONENT HÄMTAS
import { EditCustomer } from "../EditCustomer";
// HÄMTAR INFO FRÅN MODELS - adminSearch
import {
  Customer,
  CustomerSearch,
  CustomerSearchResponse,
  CustomerSerachData,
  TableInfo,
  TableSearch,
  TableSearchResponse,
} from "../../models/AdminSearch";

//EditTableInfo COMPONENT HÄMTAS
import { EditTableInfo } from "../EditTableInfo";
//MODULE STYLING
import styles from "../../scss/Admin.module.scss";
//CustomerAdmin COMPONENT HÄMTAS
import { CustomerAdmin } from "../CustomerAdmin";
//CustomerInfoAdmin COMPONENT HÄMTAS
import { CustomerInfoAdmin } from "../CustomerInfoAdmin";
import { Loader } from "../Loader";
const axios = require("axios");

export const Admin = () => {
  const [isEditTableBooking, setIsEditBooking] = useState(false);
  const [isEditTable, setisEditTable] = useState(false);
  const [getCustomerInfo, setGetCustomerInfo] = useState(false);
  const [isBookable, setIsBookable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

  //FILTRERAR UT BORDET MED KUNDEN, HÄMTAR INFORMATIONEN MED FUNCTIONEN
  //setActiveCustomerBooking ANVÄNDS SEDAN I COMPONENTEN CustomerInfoAdmin. useEfect  STARTAR OM VID FÖRÄNDRING UT AV CUSTOMER

  useEffect(() => {
    const customerBookings = tableData.filter(
      (booking) => booking.customer === customer._id
    );
    setActiveCustomerBooking(customerBookings[0]);
  }, [customer]);

  // HÄMTAR KUNDER OCH SKICKAR getCustomer MED TILL COMPONENT CustomerAdmin
  const getCustomer = async (customerId: string) => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/admin/customers/" + customerId)
      .then((Response: CustomerSearchResponse) => {
        console.log("HÄMTAR KUND", Response.data);
        setIsLoading(false);
        setCustomer(Response.data[0]);
        setGetCustomerInfo(true);
        setisEditTable(false);
        setIsEditBooking(false);
      });
  };
  // HÄMTAR KUNDER SEPARAT SOM SKA KUNNA RADERAS MED BOKNINGEN, SKICKAR MED deleteBooking TILL COMPONENTEN CustomerAdmin
  const deleteBooking = async (bookingId: string) => {
    setIsLoading(true);
    const response = await axios.delete(
      "http://localhost:8000/admin/customers/delete/" + bookingId
    );
    if (response.data.message) {
      setMessage(response.data.message);
    }
    setIsLoading(false);
    setGetCustomerInfo(false);
    setIsEditBooking(false);
    setDate(new Date());
  };

  //UPPDATERAR KUNDER VIA DESS ID, SKICKAR MED FUNCTIONEN updateCustomerData TILL COMPONENTEN EditCustomer
  const updateCustomerData = async (updatedCustomer: Customer) => {
    setIsLoading(true);
    await axios
      .put(
        "http://localhost:8000/admin/customers/" + customer._id,
        updatedCustomer
      )
      .then((response: CustomerSerachData) => {
        setCustomer(response.data);
        setIsLoading(false);
        setisEditTable(false);
      });
  };

  //UPPDATERAR SITTNINGEN VIA  DESS ID, SKICKAR MED FUNCTIONEN updatedTableInfo TILL KOMPONENTEN CustomerAdmin
  const updatedTableInfo = async (updatedTableInfo: TableInfo) => {
    setIsLoading(true);
    await axios
      .put(
        "http://localhost:8000/admin/bookings/" + tableData[0]._id,
        updatedTableInfo
      )
      .then((response: TableSearch) => {
        console.log("för Table Info", response);
        setIsEditBooking(false);
        setIsLoading(false);
      });
  };

  //KILICKAR PÅ CALENDERN DATUM, KOMMER KOMPONENTER MED INFORMATION OM DEN DAGEN
  const onChange = (date: Date) => {
    setDate(date);
    setIsBookable(false);
    setGetCustomerInfo(false);
    setIsLoading(false);
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.heroContainer}>
          <Header />
          <div className={styles.mainContentContainer}>
            <div className={styles.calender}>
              <Calendar
                className={styles.calenderTagg}
                onChange={onChange}
                value={date}
              />
            </div>
            {isLoading ? (
              <Loader />
            ) : (
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
            )}
          </div>
        </div>
      </main>
    </>
  );
};
