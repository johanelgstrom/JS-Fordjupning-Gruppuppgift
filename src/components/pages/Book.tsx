import { useEffect, useState } from "react";
import { TableBooking } from "../../models/TableBooking";
import { searchTableBooking, bookATable } from "../../services/bookingService";
import { BookTableForm } from "../BookTableForm";
import { Header } from "../Header";
import { SearchTableForm } from "../SearchTableForm";
import styles from "../../scss/Book.module.scss";
import { Contact } from "./Contact";
import { Confirmation } from "../Confirmation";
import { BookingSearch } from "../../models/BookingSearch";

export const Book = () => {
  const [newSearch, setSingleSearch] = useState<BookingSearch>({
    personAmount: "",
    /* seating: "", */
    date: "",
  });

  const [newBooking, setNewBooking] = useState<TableBooking>({
    personAmount: "",
    tableAmount: "",
    seating: "",
    date: "",
    name: "",
    email: "",
    phone: "",
  });

  const [isBookable, setIsBookable] = useState(false);
  const [seating, setSeating] = useState<string[]>([]);
  const [tableAmount, setTableAmount] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  console.log("newBooking", newBooking);

  useEffect(() => {
    if (newSearch) {
      searchTableBooking(newSearch.date, newSearch.personAmount)
        .then((data) => {
          console.log("data message", data.message);
          console.log("data tableamount", data.tableAmount);
          if (data.message === "booking is possible") {
            setIsBookable(true);
            setSeating(["18.00", "21.00"]);
            setTableAmount(data.tableAmount);
          } else if (data.message === "seating two possible") {
            setIsBookable(true);
            setSeating(["21.00"]);
            setTableAmount(data.tableAmount);
          } else if (data.message === "seating one possible") {
            setIsBookable(true);
            setSeating(["18.00"]);
            setTableAmount(data.tableAmount);
          } else {
            console.log(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [newSearch]);

  useEffect(() => {
    if (newBooking.name.length > 0) {
      bookATable(newBooking)
        .then((data) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  }, [newBooking]);

  const createBooking = (
    customerInformation: {
      name: string;
      email: string;
      phone: string;
    },
    seating: string
  ) => {
    setNewBooking(
      new TableBooking(
        newSearch.personAmount,
        tableAmount,
        seating,
        newSearch.date,
        customerInformation.name,
        customerInformation.email,
        customerInformation.phone
      )
    );
    setConfirmation(true);
    setIsBookable(false);
  };

  const createSearchTable = (personAmount: string, date: string) => {
    setSingleSearch(new BookingSearch(personAmount, date));
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.heroContainer}>
          <Header />
          <div className={styles.mainContentContainer}>
            {isBookable ? (
              <BookTableForm
                newSearch={newSearch}
                createBooking={createBooking}
                seating={seating}
              />
            ) : confirmation ? (
              <Confirmation />
            ) : (
              <SearchTableForm searchTable={createSearchTable} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};
