import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface SearchTableFormProps {
  searchTable(personAmount: string, seating: string, date: Date): void;
}

export const SearchTableForm = (props: SearchTableFormProps) => {
  const [personAmount, setPersonAmount] = useState("");
  const [seating, setSeating] = useState("");
  const [date, setDate] = useState(new Date());

  const handlePersonAmountChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const amount = event.target.value;
    setPersonAmount(amount);
  };

  const handleSeatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seating = event.target.value;
    setSeating(seating);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (seating.length > 0 && personAmount.length > 0) {
      props.searchTable(personAmount, seating, date);
    }
  };

  return (
    <>
      <main>
        <form onSubmit={handleSubmit}>
          <Calendar onChange={setDate} />

          <select
            name="personAmount"
            onChange={handlePersonAmountChange}
            id="personAmount"
            defaultValue={"default"}
          >
            <option value={"default"} disabled>
              Välj antal personer
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>

          <select
            name="seating"
            id="seating"
            defaultValue={"default"}
            onChange={handleSeatingChange}
          >
            <option value={"default"} disabled>
              Välj sittning
            </option>
            <option value="1">18.00</option>
            <option value="2">21.00</option>
          </select>
          <button type="submit">Sök lediga bord</button>
        </form>
      </main>
    </>
  );
};
