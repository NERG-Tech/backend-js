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
// validateUser
export async function validateUser({ userIdToken }) {
  const url = `${apiUrl}/user/validate/`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  return res.data;
}

export async function revokeToken(uid) {
  const url = `${apiUrl}/user/revoke/${uid}`;
  const res = await axios.post(url, {
    uid: uid,
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

export async function getPlayer() {
  const url = `${apiUrl}/player`;
  const res = await axios.get(url, {});
  return res.data;
}

export async function signout(userId) {
  console.log("userId", userId);

  const url = `${apiUrl}/signout/${userId}`;
  const res = await axios.post(url);
  return res.data;
}
export async function addPlayer(
  sex,
  age,
  weight,
  height,
  name,
  sport,
  position
) {
  const url = `${apiUrl}/player`;
  let obj = {
    sex,
    age,
    weight,
    height,
    name,
    sport,
    position,
  };
  let res;

  try {
    res = await axios.post(url, obj);
    // console.log(res.data);
  } catch (error) {
    console.error(error.data); // NOTE - use "error.response.data` (not "error")
  }
  return res.data;
}

export async function addWaistAndHip(waist, hip) {
  const url = `${apiUrl}/player/wh`;
  let obj = { waist, hip };
  let res;

  try {
    res = await axios.post(url, obj);
  } catch (error) {
    console.error(error.data); // NOTE - use "error.response.data` (not "error")
  }
  return res.data;
}

export async function getVo2(pulse) {
  const url = `${apiUrl}/player/vo2`;
  let obj = { pulse };
  let res;

  try {
    res = await axios.post(url, obj);
  } catch (error) {
    console.error(error.data); // NOTE - use "error.response.data` (not "error")
  }
  return res.data;
}

export async function getMET(minutes, seconds) {
  const url = `${apiUrl}/player/met`;
  let obj = { minutes, seconds };
  let res;

  try {
    res = await axios.post(url, obj);
  } catch (error) {
    console.error(error.data); // NOTE - use "error.response.data` (not "error")
  }
  return res.data;
}

export async function getKeyMeasurements(
  neckCircumference,
  wingSpan,
  handSize,
  hipsCircumference,
  gluteCircumference,
  waistCircumference
) {
  const url = `${apiUrl}/player/key`;
  let obj = {
    neckCircumference,
    wingSpan,
    handSize,
    hipsCircumference,
    gluteCircumference,
    waistCircumference,
  };
  let res;

  try {
    res = await axios.post(url, obj);
  } catch (error) {
    console.error(error.data); // NOTE - use "error.response.data` (not "error")
  }
  return res.data;
}
