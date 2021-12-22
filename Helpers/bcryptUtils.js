import bcryptjs from "bcryptjs";
export async function hashPassword(text) {
  console.log("Inside BCrypt Util");
  return await bcryptjs.hash(text, 12);
  // return res;
}

export async function comparePassword(password, dbPassword) {
  const isValid = await bcryptjs.compare(password, dbPassword);
  return isValid;
}
