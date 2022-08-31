import axios from "axios";
import { useEffect, useState } from "react";
import { TableBooking } from "../models/TableBooking";
import styles from "../scss/Confirmation.module.scss";

interface ConfirmationProps {
  confirmationInformation: TableBooking;
}

export const Confirmation = (props: ConfirmationProps) => {
  const [getId, setGetId] = useState<string>("");

  //Funktion som hämtar boknings-ID från bokningen som precis gjordes med hjälp av data som togs emot i formuläret
  async function getBookingId(
    name: string,
    email: string,
    date: string,
    seating: string
  ) {
    let id = await axios({
      method: "post",
      url: "http://localhost:8000/email/getBookingId",
      data: {
        name: name,
        email: email,
        date: date,
        seating: seating,
      },
    });
    setGetId(id.data);
  }

  useEffect(() => {
    // Kör funktionen ovan med hjälp av props från formuläret
    getBookingId(
      props.confirmationInformation.name,
      props.confirmationInformation.email,
      props.confirmationInformation.date,
      props.confirmationInformation.seating
    );
  }, []);
  useEffect(() => {
    // Om bokningsnumret har kommit in som det ska, skickas all information vidare till API för emailutskick
    if (getId.length > 2) {
      axios({
        method: "POST",
        url: "http://localhost:8000/email/bookConfirm",
        data: {
          name: props.confirmationInformation.name,
          email: props.confirmationInformation.email,
          date: props.confirmationInformation.date,
          seating: props.confirmationInformation.seating,
          personAmount: props.confirmationInformation.personAmount,
          id: getId,
        },
      });
    }
  }, [getId]);
  return (
    <>
      <div className={styles.confirmationContainer}>
        <div className={styles.textContainer}>
          <h3>Tack {props.confirmationInformation.name} för din bokning!</h3>
          <div>
            <p>
              Du har bokat bord för {props.confirmationInformation.personAmount}{" "}
              personer
            </p>
            <p>
              {props.confirmationInformation.date} klockan{" "}
              {props.confirmationInformation.seating}.
            </p>
            <p>
              En bekräftelse kommer skickas till dig till adressen{" "}
              {props.confirmationInformation.email}.
            </p>
            <p>Vid avbokning klicka på avbokningslänken i bekräftelsemailet</p>
            <p>eller kontakta oss på telefonnummer 0701234567</p>
          </div>
          <p>Med vänlig hälsning MATAD</p>
        </div>
      </div>
    </>
  );
};
