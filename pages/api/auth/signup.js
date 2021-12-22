import axios from "axios";

async function checkIfEmailAlreadyRegistered(email) {
  let response = null;
  try {
    response = await axios.get(
      "https://angular-hhtp-12bcd.firebaseio.com/registeredUsers.json"
    );
    const registeredUserList = [];
    if (response) {
      const { data = {} } = response;
      if (data && Object.keys(data).length > 0) {
        for (const key in data) {
          registeredUserList.push(data[key]);
        }
      }
    }
    return registeredUserList.some((x) => x.email === email);
  } catch (e) {
    console.debug(e);
  }
  return false;
}

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      email.trim() === "" ||
      !password ||
      password.trim() === ""
    ) {
      return res.status(422).json({
        message: "Invalid Input",
      });
    }
    const emailCheck = await checkIfEmailAlreadyRegistered(email);
    if (emailCheck === false) {
      return axios
        .post(
          "https://angular-hhtp-12bcd.firebaseio.com/registeredUsers.json",
          { email, password }
        )
        .then((response) => {
          const { data } = response;
          return res.status(200).json({
            message: "Email Registered",
            id: data,
          });
        })
        .catch((e) => {
          const { response: data } = e;
          return res.status(500).json({
            message: "service failed",
            data,
          });
        });
    } else {
      return res.status(200).json({
        message: "Email Already registered",
      });
    }
  }
}

export default handler;
