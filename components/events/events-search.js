import Button from "../UI/Button/button";
import styles from "./events-search.module.css";
import { useRef } from "react";
const EventsSearch = (props) => {
  const monthInpRef = useRef();
  const yearInpRef = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const selectedMonth = monthInpRef.current.value;
    const selectedYear = yearInpRef.current.value;
    props.redirectionHandler(selectedMonth, selectedYear);
  };
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          <select name="year" id="year" ref={yearInpRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          <select name="month" id="month" ref={monthInpRef}>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
};

export default EventsSearch;
