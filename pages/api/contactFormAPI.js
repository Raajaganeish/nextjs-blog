import axios from "axios";

function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({
        message: "Validation Failed",
        response: req.body,
      });
      return;
    }

    return axios
      .post(
        "https://angular-hhtp-12bcd.firebaseio.com/submitContactForm.json",
        req.body
      )
      .then((response) => {
        const { data } = response;
        console.log(data);
        res.status(200).json({
          message: "Submitted Successfully",
        });
        return;
      })
      .catch((error) => {
        const { response: data } = error;
        console.log(data);
        res.status(404).json({
          message: "Service has Failed, Please retry",
        });
        return;
      });
  }
}
export default handler;
