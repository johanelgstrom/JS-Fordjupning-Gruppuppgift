import Calendar from "react-calendar";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
  AdminSearch,
  customerSearch,
  customerSearchResponse,
} from "../../models/AdminSearch";

const axios = require("axios");

export const Admin = () => {
  const [date, setDate] = useState(new Date());
  const [customer, setCustomer] = useState<customerSearch[]>([]);
  const [adminData, setadminData] = useState<AdminSearch[]>([
    // {
    //   _id: "",
    //   date: "",
    //   seating: "",
    //   tableamount: "",
    //   customer: "",
    // },
  ]);

  console.log("ADMIN DATA", adminData);
  console.log("customer", customer);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/admin/all-bookings")
  //     .then((response: AxiosResponse) => {
  //       setadminData(response.data);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/admin/all-bookings" +
          "/" +
          date.toLocaleDateString()
      )
      .then((response: AxiosResponse) => {
        setadminData(response.data);
      });
  }, [date]);

  // const handleClick = () => {
  //   setadminData([...adminData]);
  //   console.log(adminData);
  // };
  const getCustomer = async (customerId: string) => {
    console.log(customerId);
    await axios
      .get("http://localhost:8000/admin/customers/" + customerId)
      .then((Response: customerSearchResponse) => {
        console.log("response", Response.data);
        setCustomer(Response.data);
      });
  };

  const onChange = (date: Date) => {
    setDate(date);
  };
  console.log(date);
  const deleteBooking = async (bookingId: string) => {
    await axios
      .post("http://localhost:8000/admin/customers/delete/" + bookingId)
      .then((response: AxiosResponse) => {
        console.log(response);
        setDate(new Date());
      });
  };

  return (
    <>
      <div>
        <Calendar onChange={onChange} value={date} />
      </div>
      {adminData.map((admin) => {
        return (
          <div key={admin._id}>
            <p>{admin.customer}</p>
            <p>{admin.date}</p>
            <button onClick={() => getCustomer(admin.customer)}>
              Hämta kund
            </button>
            <button onClick={() => deleteBooking(admin._id)}>Radera</button>
          </div>
        );
      })}

      {customer.map((customer) => {
        return (
          <div key={customer._id}>
            <p>{customer.email}</p>
          </div>
        );
      })}
    </>
  );
};
