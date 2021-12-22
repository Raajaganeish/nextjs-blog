import { useRouter } from "next/router";
// import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import {
  getAllEventsAPI,
  getFeaturedEvents as helperGetFeaturedEvents,
  getEventById as helperGetEventById,
} from "../../Helpers/api-utils";
import Comments from "../../components/input/comments";

const EventIdPage = (props) => {
  // const {
  //   query: { eventId },
  // } = useRouter();
  // const eventDetail = getEventById(eventId);
  const { eventDetail } = props;
  console.log(eventDetail);
  const { title, description, date, image, location, id } = eventDetail || {};
  return (
    <div>
      <EventSummary title={title} />
      <EventLogistics date={date} address={location} image={image} />
      <EventContent>
        <p>{description}</p>
      </EventContent>
      <Comments eventId={id} />
    </div>
  );
};

export async function getStaticPaths() {
  const allEventsIds = await helperGetFeaturedEvents();
  const paths = allEventsIds.map((event) => ({
    params: { eventId: event.id },
  }));
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { eventId } = context.params;
  console.log(eventId);
  const result = await helperGetEventById(eventId);
  return {
    props: {
      eventDetail: result,
    },
  };
}

export default EventIdPage;
