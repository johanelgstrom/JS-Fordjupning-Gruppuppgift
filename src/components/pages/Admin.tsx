import Calendar from "react-calendar";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { AdminSearch } from "../../models/AdminSearch";

const axios = require("axios");

export const Admin = () => {
  const [date, setDate] = useState(new Date());
  const [adminData, setadminData] = useState<AdminSearch[]>([
    {
      _id: "",
      date: "",
      seating: "",
      tableamount: "",
      customer: "",
    },
  ]);

  console.log("ADMIN DATA", adminData);

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/all-bookings")
      .then((response: AxiosResponse) => {
        setadminData(response.data);
      });
  }, []);

  const handleClick = () => {
    setadminData([...adminData]);
    console.log(adminData);
  };

  const onChange = (date: any) => {
    setDate(date);
  };
  console.log(date);
  return (
    <>
      <div>
        <Calendar onChange={onChange} value={date} />

        <div>{date.toString()}</div>
      </div>
      {adminData.map((admin) => {
        return (
          <div key={admin._id}>
            <p>{admin.customer}</p>
            <p>{admin.date}</p>
          </div>
        );
      })}
      <p>hej hej </p>
      <button onClick={handleClick}>
        hämta bokningar
        <div>
          <p></p>
        </div>
      </button>
    </>
  );
};
