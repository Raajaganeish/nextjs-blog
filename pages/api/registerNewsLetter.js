import axios from "axios";
import { getRegisteredEmailsFromAPI } from "../../Helpers/api-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const { emailId } = req.body;
    console.log(emailId);
    const response = await getRegisteredEmailsFromAPI();
    const { data } = response;
    for (const key in data) {
      const { emailId: currentEmailId } = data[key];
      if (currentEmailId === emailId) {
        res.status(409).json({
          message: "This email Already exists",
          emailId,
        });
        return;
      }
    }
    axios
      .post("https://angular-hhtp-12bcd.firebaseio.com/registeredEmails.json", {
        timeStamp: new Date().toGMTString(),
        emailId,
      })
      .then((response) => {
        res.status(201).json({
          message: "EmailId has been subscribed",
          ...res.data,
        });
        return;
      });
  }
}

export default handler;
