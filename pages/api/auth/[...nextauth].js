import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import { comparePassword } from "../../../Helpers/bcryptUtils";

async function checkIfUserAlreadyRegistered(email) {
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
          registeredUserList.push({
            ...data[key],
            entryId: key,
          });
        }
      }
    }
    return registeredUserList.find((x) => x.email === email) || {};
  } catch (e) {
    console.debug(e);
  }
  return {};
}
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials, req) {
        console.log(credentials);
        const userObj = await checkIfUserAlreadyRegistered(credentials.email);
        if (Object.keys(userObj).length > 0) {
          const isValid = await comparePassword(
            credentials.password,
            userObj.password
          );
          if (isValid) {
            return {
              email: credentials.email,
            };
          } else {
            throw new Error("Password is incorrect!!!");
          }
        } else {
          throw new Error("User not found");
        }
      },
    }),
  ],
});
