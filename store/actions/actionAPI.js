import axios from "axios";
import { signIn } from "next-auth/client";

export const registerAPI = (postData) => {
  return axios.post("/api/auth/signup", postData);
};

export const invokeSignInAPI = ({ email, password }) => {
  return signIn("credentials", {
    redirect: false,
    email,
    password,
  });
};

export const changePasswordAPI = (postData) => {
  return axios.patch("/api/user/change-password", postData);
};
