import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface SearchTableFormProps {
  searchTable(personAmount: string, value: string): void;
}

export const SearchTableForm = (props: SearchTableFormProps) => {
  const [personAmount, setPersonAmount] = useState("");
  const [value, setValue] = useState(new Date());

  const handlePersonAmountChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const amount = event.target.value;
    setPersonAmount(amount);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (personAmount.length > 0) {
      props.searchTable(personAmount, value.toLocaleDateString());
    }
  };

  return (
    <>
      <main>
        <form onSubmit={handleSubmit}>
          <Calendar onChange={setValue} value={value} locale="sv-SV" />

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
          <button type="submit">Sök lediga bord</button>
        </form>
      </main>
    </>
  );
};
