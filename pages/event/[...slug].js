import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/UI/error-alert/error-alert";
import Button from "../../components/UI/Button/button";
import { getFilteredEvents as helperGetFilteredEvents } from "../../Helpers/api-utils";
import axios from "axios";
const FilteresEventPage = (props) => {
  const {
    query: { slug },
  } = useRouter();
  const [resultList, setResultList] = useState([]);
  const { data, error } = useSWR(
    "https://angular-hhtp-12bcd.firebaseio.com/events.json",
    (url) => axios.get(url).then((res) => res.data)
  );

  useEffect(() => {
    if (data) {
      let resultList = [];
      for (const key in data) {
        resultList.push({
          ...data[key],
        });
      }
      const list = slug;
      const [month = "0", year = "0"] = list || [];
      const monthInt = parseInt(month);
      const yearInt = parseInt(year);
      resultList = resultList.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === yearInt &&
          eventDate.getMonth() === monthInt - 1
        );
      });
      setResultList(resultList);
    }
  }, [data]);
  const list = slug;
  const [month = "0", year = "0"] = list || [];
  const monthInt = parseInt(month);
  const yearInt = parseInt(year);
  if (isNaN(monthInt) || isNaN(yearInt)) {
    return (
      <Fragment>
        <ErrorAlert>
          <h2>URL has some invalid format to query</h2>
        </ErrorAlert>
        <div className={"center"}>
          <Button link={"/event"}>View All Events</Button>
        </div>
      </Fragment>
    );
  }
  const date = new Date(yearInt, monthInt - 1);
  console.log(resultList);
  // const resultList = getFilteredEvents({ year: yearInt, month: monthInt });
  // const { resultList, dateObj } = props;
  // const date = new Date(dateObj.monthInt, dateObj.yearInt);
  if (!resultList || resultList.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <h2>No results!</h2>
        </ErrorAlert>
        <div className={"center"}>
          <Button link={"/event"}>View All Events</Button>
        </div>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList eventList={resultList} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const [month = "0", year = "0"] = params.slug;
//   const monthInt = parseInt(month);
//   const yearInt = parseInt(year);
//   if (isNaN(monthInt) || isNaN(yearInt)) {
//     return {
//       notFound: "true",
//     };
//   }
//
//   const resultList = await helperGetFilteredEvents({
//     year: yearInt,
//     month: monthInt,
//   });
//   return {
//     props: {
//       resultList,
//       dateObj: {
//         monthInt,
//         yearInt,
//       },
//     },
//   };
// }

export default FilteresEventPage;
