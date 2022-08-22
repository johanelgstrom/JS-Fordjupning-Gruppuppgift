import { useEffect, useState } from "react";
import { BookingSearch } from "../../models/BookingSearch";
import { TableBooking } from "../../models/TableBooking";
import { searchTableBooking, bookATable } from "../../services/bookingService";
import { BookTableForm } from "../BookTableForm";
import { SearchTableForm } from "../SearchTableForm";
export const Book = () => {
  const [newSearch, setSingleSearch] = useState<BookingSearch>({
    personAmount: "",
    seating: "",
    date: "",
  });

  const [newBooking, setNewBooking] = useState<TableBooking>({
    personAmount: "",
    seating: "",
    date: "",
    name: "",
    email: "",
    phone: "",
  });

  const [isBookable, setIsBookable] = useState(false);

  useEffect(() => {
    if (newSearch.seating.length > 0) {
      searchTableBooking(newSearch.date, newSearch.seating)
        .then((data) => {
          if ((data = 202)) {
            setIsBookable(true);
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
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [newBooking]);

  const createBooking = (customerInformation: {
    name: string;
    email: string;
    phone: string;
  }) => {
    setNewBooking(
      new TableBooking(
        newSearch.personAmount,
        newSearch.seating,
        newSearch.date,
        customerInformation.name,
        customerInformation.email,
        customerInformation.phone
      )
    );
  };

  const createSearchTable = (
    personAmount: string,
    seating: string,
    date: string
  ) => {
    setSingleSearch(new BookingSearch(personAmount, seating, date));
  };

  return (
    <>
      {isBookable ? (
        <BookTableForm newSearch={newSearch} createBooking={createBooking} />
      ) : (
        <SearchTableForm searchTable={createSearchTable} />
      )}
    </>
  );
};
