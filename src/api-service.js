import axios from "axios";
// import { CLOUD_FUNCTIONS_ORIGIN } from "./functions-origin";

const apiUrl = `https://us-central1-nerg-one.cloudfunctions.net/api`;

export async function signIn({ email, password }) {
  const url = `${apiUrl}/login`;
  const res = await axios.post(url, { email, password });
  return res.data;
}

export async function signUp({ email, password, secureNote }) {
  const url = `${apiUrl}/register`;
  const res = await axios.post(url, {
    email,
    password,
    secureNote,
  });
  return res.data;
}

export async function getUserData({ userIdToken, userId }) {
  const url = `${apiUrl}/users/${userId}`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  return res.data;
}

export async function addPlayer(sex, age, weight, height) {
  console.log(
    " sex, age, weight, height  in api-service",
    sex,
    age,
    weight,
    height
  );

  const url = `${apiUrl}/player`;
  console.log(url);
  let res;
  try {
    res = await axios.post(url, {
      sex,
      age,
      weight,
      height,
    });
    console.log(res.data);
  } catch (error) {
    console.error(error.data); // NOTE - use "error.response.data` (not "error")
  }
  return res.data;
}
