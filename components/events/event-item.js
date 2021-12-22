import Link from "next/link";
import styles from "./event-item.module.css";
import Image from "next/image";
import Button from "../UI/Button/button";
import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
const EventItem = (props) => {
  const { event } = props;
  const { title, date, location, id, image } = event;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location?.replace(", ", "\n");
  return (
    <li className={styles.item}>
      <Image
        src={"/" + image}
        onLoadStart={() => <h1>Loading</h1>}
        width={300}
        height={300}
        quality={75}
      />
      {/*<img src={"/" + image} alt="" />*/}
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address dangerouslySetInnerHTML={{ __html: formattedAddress }} />
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={`/event/${id}`}>
            <div className={styles.icon}>
              <span>Explore Event</span>
              <ArrowRightIcon />
            </div>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
