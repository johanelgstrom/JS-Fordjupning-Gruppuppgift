import React, { useEffect, useState } from "react";
import { TableAmountSum, TableInfo, TableSearch } from "../models/AdminSearch";
import style from ".././scss/AdminEditTable.module.scss";

interface EditTableInfoProps {
  tableInfo: TableSearch;
  updatedTableInfo(updatedTableInfo: TableInfo, bookinId: string): void;
  setisEditTable(setisEditTable: boolean): void;
  tableAmountSum: TableAmountSum;
}

export const EditTableInfo = (props: EditTableInfoProps) => {
  // COMPONENT STATES
  const [updatedTableInfo, setUpdatedTableInfo] = useState<TableSearch>({
    date: props.tableInfo.date,
    seating: props.tableInfo.seating,
    personAmount: props.tableInfo.personAmount,
    tableAmount: props.tableInfo.tableAmount,
    customer: props.tableInfo.customer,
    _id: props.tableInfo._id,
  });

  const [seating, setSeating] = useState<string[]>([]);
  const [personAmountOption, setPersonAmountOption] = useState<string[]>([]);

  //SET TABLE AMOUNT

  useEffect(() => {
    let tableAmount = "2";
    if (parseInt(updatedTableInfo.personAmount) < 7) {
      tableAmount = "1";
    }
    if (updatedTableInfo.tableAmount !== tableAmount) {
      setUpdatedTableInfo({ ...updatedTableInfo, tableAmount: tableAmount });
    }
  }, [updatedTableInfo.tableAmount, updatedTableInfo]);

  // CHECK AVALIBILITY FOR CHANGE SEATING
  useEffect(() => {
    if (
      props.tableAmountSum.tableSumSeatingOne > 14 &&
      props.tableAmountSum.tableSumSeatingTwo > 14
    ) {
      setSeating(["Fullbokat"]);
    } else if (
      props.tableAmountSum.tableSumSeatingOne > 14 &&
      props.tableAmountSum.tableSumSeatingTwo < 15
    ) {
      setSeating(["21.00"]);
    } else if (
      props.tableAmountSum.tableSumSeatingTwo > 14 &&
      props.tableAmountSum.tableSumSeatingOne < 15
    ) {
      setSeating(["18.00"]);
    } else if (
      props.tableAmountSum.tableSumSeatingOne > 14 &&
      props.tableAmountSum.tableSumSeatingTwo > 13
    ) {
      setSeating(["21.00"]);
    } else if (
      props.tableAmountSum.tableSumSeatingOne > 13 &&
      props.tableAmountSum.tableSumSeatingTwo > 14
    ) {
      setSeating(["21.00"]);
    } else {
      setSeating(["18.00", "21.00"]);
    }
  }, [
    updatedTableInfo.personAmount,
    props.tableAmountSum.tableSumSeatingOne,
    props.tableAmountSum.tableSumSeatingTwo,
    updatedTableInfo,
  ]);

  //CHECK AVALIBILITY FOR CHANGE PERSON AMOUNT

  useEffect(() => {
    if (updatedTableInfo.seating !== props.tableInfo.seating) {
      if (
        updatedTableInfo.seating === "fullbokat" &&
        props.tableAmountSum.tableSumSeatingTwo < 7
      ) {
        setPersonAmountOption(["1", "2", "3", "4", "5", "6"]);
      } else if (
        updatedTableInfo.seating === "fullbokat" &&
        props.tableAmountSum.tableSumSeatingOne < 7
      ) {
        setPersonAmountOption(["1", "2", "3", "4", "5", "6"]);
      } else if (
        updatedTableInfo.seating === "fullbokat" &&
        props.tableAmountSum.tableSumSeatingOne > 6
      ) {
        setPersonAmountOption([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]);
      } else if (
        updatedTableInfo.seating === "fullbokat" &&
        props.tableAmountSum.tableSumSeatingTwo > 6
      ) {
        setPersonAmountOption([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]);
      } else if (
        updatedTableInfo.seating === "18.00" &&
        props.tableAmountSum.tableSumSeatingOne > 13
      ) {
        setPersonAmountOption(["1", "2", "3", "4", "5", "6"]);
      } else if (
        updatedTableInfo.seating === "18.00" &&
        props.tableAmountSum.tableSumSeatingOne > 13
      ) {
        setPersonAmountOption(["1", "2", "3", "4", "5", "6"]);
      } else if (
        updatedTableInfo.seating === "18.00" &&
        props.tableAmountSum.tableSumSeatingOne < 14
      ) {
        setPersonAmountOption([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]);
      } else if (
        updatedTableInfo.seating === "18.00" &&
        props.tableAmountSum.tableSumSeatingTwo < 14
      ) {
        setPersonAmountOption([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]);
      } else if (
        updatedTableInfo.seating === "21.00" &&
        props.tableAmountSum.tableSumSeatingTwo > 13
      ) {
        setPersonAmountOption(["1", "2", "3", "4", "5", "6"]);
      } else if (
        updatedTableInfo.seating === "21.00" &&
        props.tableAmountSum.tableSumSeatingTwo > 13
      ) {
        setPersonAmountOption(["1", "2", "3", "4", "5", "6"]);
      } else if (
        updatedTableInfo.seating === "21.00" &&
        props.tableAmountSum.tableSumSeatingTwo < 14
      ) {
        setPersonAmountOption([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]);
      } else {
        setPersonAmountOption([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]);
      }
    } else {
      if (
        updatedTableInfo.seating === "fullbokat" &&
        props.tableAmountSum.tableSumSeatingTwo -
          parseInt(updatedTableInfo.tableAmount) <
          7
      ) {
        setPersonAmountOption(["1", "2", "3", "4", "5", "6"]);
      } else if (
        updatedTableInfo.seating === "fullbokat" &&
        props.tableAmountSum.tableSumSeatingOne -
          parseInt(updatedTableInfo.tableAmount) <
          7
      ) {
        setPersonAmountOption(["1", "2", "3", "4", "5", "6"]);
      } else if (
        updatedTableInfo.seating === "fullbokat" &&
        props.tableAmountSum.tableSumSeatingOne -
          parseInt(updatedTableInfo.tableAmount) >
          6
      ) {
        setPersonAmountOption([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]);
      } else if (
        updatedTableInfo.seating === "fullbokat" &&
        props.tableAmountSum.tableSumSeatingTwo -
          parseInt(updatedTableInfo.tableAmount) >
          6
      ) {
        setPersonAmountOption([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]);
      } else if (
        updatedTableInfo.seating === "18.00" &&
        props.tableAmountSum.tableSumSeatingOne -
          parseInt(updatedTableInfo.tableAmount) >
          13
      ) {
        setPersonAmountOption(["1", "2", "3", "4", "5", "6"]);
      } else if (
        updatedTableInfo.seating === "18.00" &&
        props.tableAmountSum.tableSumSeatingTwo -
          parseInt(updatedTableInfo.tableAmount) >
          13
      ) {
        setPersonAmountOption(["1", "2", "3", "4", "5", "6"]);
      } else if (
        updatedTableInfo.seating === "18.00" &&
        props.tableAmountSum.tableSumSeatingOne -
          parseInt(updatedTableInfo.tableAmount) <
          14
      ) {
        setPersonAmountOption([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]);
      } else if (
        updatedTableInfo.seating === "18.00" &&
        props.tableAmountSum.tableSumSeatingTwo -
          parseInt(updatedTableInfo.tableAmount) <
          14
      ) {
        setPersonAmountOption([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]);
      } else if (
        updatedTableInfo.seating === "21.00" &&
        props.tableAmountSum.tableSumSeatingTwo -
          parseInt(updatedTableInfo.tableAmount) >
          13
      ) {
        setPersonAmountOption(["1", "2", "3", "4", "5", "6"]);
      } else if (
        updatedTableInfo.seating === "21.00" &&
        props.tableAmountSum.tableSumSeatingTwo -
          parseInt(updatedTableInfo.tableAmount) >
          13
      ) {
        setPersonAmountOption(["1", "2", "3", "4", "5", "6"]);
      } else if (
        updatedTableInfo.seating === "21.00" &&
        props.tableAmountSum.tableSumSeatingTwo -
          parseInt(updatedTableInfo.tableAmount) <
          14
      ) {
        setPersonAmountOption([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]);
      } else {
        setPersonAmountOption([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]);
      }
    }
  }, [
    props.tableAmountSum.tableSumSeatingOne,
    props.tableAmountSum.tableSumSeatingTwo,
    seating,
    updatedTableInfo.seating,
    updatedTableInfo.tableAmount,
    updatedTableInfo,
    props.tableInfo.seating,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.updatedTableInfo(updatedTableInfo, updatedTableInfo._id);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "default") {
      setUpdatedTableInfo({
        ...updatedTableInfo,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <main className={style.containerFormTable}>
        <div className={style.formTable}>
          <form onSubmit={handleSubmit}>
            <div className={style.styleTableImputs}>
              <p>Datum: {updatedTableInfo.date}</p>
              <label>
                <strong>Sittning:</strong>
              </label>
              <select
                onChange={handleSelect}
                name="seating"
                value={updatedTableInfo.seating}
              >
                <option value={"default"}>
                  Välj här om du vill ändra sittning
                </option>
                {seating.map((seating, index) => {
                  return (
                    <option key={index} value={seating}>
                      {seating}
                    </option>
                  );
                })}
              </select>

              <label>
                <strong>Antal Personer</strong>
              </label>

              <select
                onChange={handleSelect}
                name="personAmount"
                id="personAmount"
                value={updatedTableInfo.personAmount}
              >
                {personAmountOption.map((persons, index) => {
                  return (
                    <option value={persons} key={index}>
                      {persons}
                    </option>
                  );
                })}
              </select>
              <p>Kund id: {updatedTableInfo.customer}</p>
              <p>Boknings id: {updatedTableInfo._id}</p>

              <button
                id="adminEditTableSubmit"
                type="submit"
                className={style.button}
              >
                Ändra uppgifter
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
