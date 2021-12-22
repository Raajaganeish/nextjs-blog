import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import Head from "next/head";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import { getAllEventsAPI } from "../../Helpers/api-utils";

const AllEvents = (props) => {
  // const eventList = getAllEvents();
  const { eventList } = props;
  const router = useRouter();
  const redirectionHandler = (y, m) => {
    router.push(`/event/${y}/${m}`);
  };
  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta
          name={"description"}
          content={"This is a page for browsing all events"}
        />
      </Head>
      <EventsSearch redirectionHandler={redirectionHandler} />
      <EventList eventList={eventList} />
    </div>
  );
};

export async function getStaticProps() {
  const eventList = await getAllEventsAPI();
  console.log(eventList);
  return {
    props: {
      eventList,
    },
    revalidate: 60,
  };
}

export default AllEvents;
