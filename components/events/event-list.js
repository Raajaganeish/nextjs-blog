import EventItem from "./event-item";
import styles from "./event-list.module.css";
const EventList = (props) => {
  const { eventList } = props;
  return (
    <ul className={styles.list}>
      {eventList.map((event, index) => (
        <EventItem event={event} key={index} />
      ))}
    </ul>
  );
};

export default EventList;
