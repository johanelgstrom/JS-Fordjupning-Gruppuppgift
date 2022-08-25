import Calendar from "react-calendar";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
  AdminSearch,
  customer,
  customerSearch,
  customerSearchResponse,
} from "../../models/AdminSearch";
import { Header } from "../Header";
import { EditCustomer } from "../EditCustomer";

const axios = require("axios");

export const Admin = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [customer, setCustomer] = useState<customerSearch[]>([]);

  const [adminData, setadminData] = useState<AdminSearch[]>([]);

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

  const updateCustomerData = async (updatedCustomer: customer) => {
    await axios
      .put(
        "http://localhost:8000/admin/customers/" + customer[0]._id,
        updatedCustomer
      )
      .then((response: customerSearch) => {
        console.log("PUT LOGGEN", response);
        // customer.splice(0, 1, response);
        setIsEditable(false);
      });
  };

  const getCustomer = async (customerId: string) => {
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

  const deleteBooking = async (bookingId: string) => {
    const response = await axios.delete(
      "http://localhost:8000/admin/customers/delete/" + bookingId
    );
    if (response.data.message) {
      setMessage(response.data.message);
      setDate(new Date());
      setCustomer([]);
    }

    // await axios
    //   .post("http://localhost:8000/admin/customers/delete/" + bookingId)
    //   .then((response: AxiosResponse) => {
    //     console.log(response);
    //     setDate(new Date());
    //   });
  };

  // await axios
  //   .put("http://localhost:8000/admin/customers/" + updateCustomer)
  //   .then((response: customerSearchResponse) => {
  //     console.log("PUT LOGGEN", response);
  //   });

  const editCustomer = () => {
    setIsEditable(true);
  };

  return (
    <>
      <Header />
      <div>
        <Calendar onChange={onChange} value={date} />
      </div>
      {adminData.map((admin) => {
        return (
          <div key={admin._id}>
            <p>{admin.customer}</p>
            <p>{admin.date}</p>
            <p>{admin.seating}</p>
            <p>{admin.tableamount}</p>
            <button onClick={() => getCustomer(admin.customer)}>
              Hämta kund
            </button>
            <button onClick={() => deleteBooking(admin._id)}>Radera</button>
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
            <button onClick={editCustomer}>Ändra</button>
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
    </>
  );
};
