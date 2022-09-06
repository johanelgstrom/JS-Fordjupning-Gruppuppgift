import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../scss/SearchTableForm.module.scss";

interface SearchTableFormProps {
  searchTable(personAmount: string, value: string): void;
}

export const SearchTableForm = (props: SearchTableFormProps) => {
  //STATES
  const [personAmount, setPersonAmount] = useState("");
  const [value, setValue] = useState(new Date());
  const [personValidate, setPersonValidate] = useState(false);

  //HANDLE SELECT CHANGE
  const handlePersonAmountChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const amount = event.target.value;
    setPersonValidate(false);
    setPersonAmount(amount);
  };

  //HANDLE SUBMIT AND SEND BACK TO BOOK
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (personAmount.length < 1) {
      setPersonValidate(true);
    } else {
      props.searchTable(personAmount, value.toLocaleDateString());
    }
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Calendar
            onChange={setValue}
            value={value}
            locale="sv-SV"
            minDate={new Date()}
          />
          <select
            name="personAmount"
            onChange={handlePersonAmountChange}
            id="personAmount"
            defaultValue={"default"}
            required
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
          {personValidate ? (
            <div className={styles.validate} id="validateContainer">
              <p>Du måste välja antal personer!</p>
            </div>
          ) : (
            <></>
          )}
          <button
            type="submit"
            className={styles.submitButton}
            id="submitBooking"
          >
            Sök lediga bord
          </button>
        </form>
      </main>
    </>
  );
};
