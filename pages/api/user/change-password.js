import { getSession } from "next-auth/client";
import axios from "axios";
import { comparePassword, hashPassword } from "../../../Helpers/bcryptUtils";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({
      message: "Only PATCH Request Type is supported",
    });
  }
  const session = await getSession({ req: req });
  if (!session) {
    return res.status(401).json({
      message: "UnAuthorized to access the resource",
    });
  }
  const { email } = session.user;
  const { newPassword, oldPassword } = req.body;

  const getUserUniqueId = await axios.get(
    "https://angular-hhtp-12bcd.firebaseio.com/registeredUsers.json"
  );
  let uId = null;
  const { data } = getUserUniqueId;
  for (const k in data) {
    const obj = data[k];
    if (obj?.email === email) {
      uId = k;
      break;
    }
  }

  if (email && uId) {
    const userObj = await axios.get(
      `https://angular-hhtp-12bcd.firebaseio.com/registeredUsers/${uId}.json`
    );
    const { data } = userObj;
    const isValidPassword = await comparePassword(oldPassword, data.password);
    try {
      if (!isValidPassword) {
        return res.status(403).json({
          message: "Old Password is in-correct",
        });
      }
      const postData = {
        email: email,
        password: newPassword,
      };

      const pResponse = await axios.put(
        `https://angular-hhtp-12bcd.firebaseio.com/registeredUsers/${uId}.json`,
        postData
      );
      console.table(pResponse.data);
      return res.status(200).json({
        message: "Password has been updated Successfully",
      });
    } catch (e) {
      console.log(e);
    }
  }

  return res.status(500).json({
    message: "Service Failed",
  });
}

export default handler;
