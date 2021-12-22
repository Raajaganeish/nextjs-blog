import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { getFeaturedEvents } from "../../dummy-data";
import { getFeaturedEvents as allFeaturedEventsFromAPI } from "../../Helpers/api-utils";
import EventList from "../../components/events/event-list";
import NewsletterRegistration from "../../components/input/newsletter-registration";

export default function Home(props) {
  // const featuredEvents = getFeaturedEvents();
  const { resultList } = props;
  return (
    <div className={styles.container}>
      <NewsletterRegistration />
      <EventList eventList={resultList} />
    </div>
  );
}

export async function getStaticProps() {
  const resultList = await allFeaturedEventsFromAPI();
  return {
    props: {
      resultList,
    },
  };
}
