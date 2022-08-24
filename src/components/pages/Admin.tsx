import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { AdminSearch } from "../../models/AdminSearch";

const axios = require("axios");

export const Admin = () => {
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

  return (
    <>
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
