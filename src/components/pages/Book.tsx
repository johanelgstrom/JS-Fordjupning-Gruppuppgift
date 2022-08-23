import { useEffect, useState } from "react";
import { BookingSearch } from "../../models/BookingSearch";
import { TableBooking } from "../../models/TableBooking";
import { searchTableBooking, bookATable } from "../../services/bookingService";
import { BookTableForm } from "../BookTableForm";
import { Header } from "../Header";
import { SearchTableForm } from "../SearchTableForm";
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
        .then((data) => {
          console.log("Book a table data", data);
        })
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
  };

  const createSearchTable = (personAmount: string, date: string) => {
    setSingleSearch(new BookingSearch(personAmount, date));
  };

  return (
    <>
      <Header />
      {isBookable ? (
        <BookTableForm
          newSearch={newSearch}
          createBooking={createBooking}
          seating={seating}
        />
      ) : (
        <SearchTableForm searchTable={createSearchTable} />
      )}
    </>
  );
};
