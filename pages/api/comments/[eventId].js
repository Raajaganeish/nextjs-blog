import axios from "axios";

async function handler(req, res) {
  console.log(req.query);
  const { eventId } = req.query;
  if (req.method === "POST") {
    const { id, type } = req.body;
    if (type === "DELETE") {
      const response = await axios.delete(
        `https://angular-hhtp-12bcd.firebaseio.com/getComments/${eventId}/${id}.json`
      );
      res.status(200).json({
        message: "Comment has bee deleted",
        date: response?.headers?.date,
      });
      return;
    }
  }
  if (req.method === "POST") {
    const { email, text, name } = req.body;
    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input to add a comment" });
      return;
    }
    const postDataForDB = {
      email,
      text,
      name,
      timeStamp: new Date().toGMTString(),
    };
    const response = await axios.post(
      `https://angular-hhtp-12bcd.firebaseio.com/getComments/${eventId}.json`,
      postDataForDB
    );
    const { data } = response;
    res
      .status(201)
      .json({ message: "Comment has been added", eventId, response: data });
  }
  if (req.method === "GET") {
    console.log(eventId);
    const response = await axios.get(
      `https://angular-hhtp-12bcd.firebaseio.com/getComments/${eventId}.json`
    );
    const { data } = response;
    const resultList = [];
    for (const key in data) {
      if (data[key]) {
        resultList.push({ id: key, ...data[key] });
      }
    }
    console.log(resultList);
    res.status(200).json({
      commentsList: resultList,
    });
  }
}

export default handler;
