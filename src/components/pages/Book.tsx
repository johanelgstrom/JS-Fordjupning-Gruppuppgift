import { useEffect, useState } from "react";
import { BookingSearch } from "../../models/BookingSearch";
import { TableBooking } from "../../models/TableBooking";
import { searchTableBooking, bookATable } from "../../services/bookingService";
import { BookTableForm } from "../BookTableForm";
import { Header } from "../Header";
import { SearchTableForm } from "../SearchTableForm";
import styles from "../../scss/Book.module.scss";
import { Confirmation } from "../Confirmation";
import { Loader } from "../Loader";

export const Book = () => {
  const [newSearch, setSingleSearch] = useState<BookingSearch>({
    personAmount: "",
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
  const [isLoading, setIsLoading] = useState(false);

  //SEARCH DB AND CHECK WHITCH SEATING IS POSSIBLE DEPENDING ON PERSONS
  useEffect(() => {
    if (newSearch.date && newSearch.personAmount.length > 0) {
      setIsLoading(true);
      searchTableBooking(newSearch.date, newSearch.personAmount)
        .then((data) => {
          if (data.message === "booking is possible") {
            setIsLoading(false);
            setIsBookable(true);
            setSeating(["18.00", "21.00"]);
            setTableAmount(data.tableAmount);
          } else if (data.message === "seating two possible") {
            setIsLoading(false);
            setIsBookable(true);
            setSeating(["21.00"]);
            setTableAmount(data.tableAmount);
          } else if (data.message === "seating one possible") {
            setIsLoading(false);
            setIsBookable(true);
            setSeating(["18.00"]);
            setTableAmount(data.tableAmount);
          } else {
            setIsLoading(false);
            console.log(data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  }, [newSearch]);

  //BOOK A TABLE
  useEffect(() => {
    if (newBooking.name.length > 0) {
      setIsLoading(true);
      bookATable(newBooking)
        .then((data) => {
          setIsLoading(false);
          setConfirmation(true);
        })
        .catch((error) => {
          setIsLoading(false);
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
            {isLoading ? (
              <Loader />
            ) : isBookable ? (
              <BookTableForm
                newSearch={newSearch}
                createBooking={createBooking}
                seating={seating}
              />
            ) : confirmation ? (
              <Confirmation confirmationInformation={newBooking} />
            ) : (
              <SearchTableForm searchTable={createSearchTable} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};
