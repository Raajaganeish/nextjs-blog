import axios from "axios";

export const getAllEventsAPI = async () => {
  return axios
    .get("https://angular-hhtp-12bcd.firebaseio.com/events.json")
    .then((response) => {
      const responseData = response.data;
      const resultList = [];
      for (const key in responseData) {
        resultList.push({
          ...responseData[key],
        });
      }
      return resultList;
    });
};

export const getFeaturedEvents = async () => {
  console.log("In getFeaturedEvents");
  return getAllEventsAPI().then((res) => res.filter((x) => x.isFeatured));
};

export const getEventById = async (id) => {
  return getAllEventsAPI().then((res) => res.find((x) => x.id === id) || {});
};

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const resultList = await getAllEventsAPI();
  let filteredEvents = resultList.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export const getRegisteredEmailsFromAPI = () => {
  return axios.get(
    "https://angular-hhtp-12bcd.firebaseio.com/registeredEmails.json"
  );
};
