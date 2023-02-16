const functions = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");

const DB_USERS = "Users";
const DB_PLAYERS = "Players";

// ---------------------------------------------------------------

initializeApp();
const db = getFirestore();

// ---------------------------------------------------------------

exports.firebaseAuth = functions.https.onCall(async (data, context) => {
  const regex = /Bearer (.+)/i;
  try {
    const idToken = data.headers["authorization"].match(regex)?.[1];
    data.token = await getAuth().verifyIdToken(idToken);
    return { result: "success" };
  } catch (err) {
    return { code: "unauthenticated" };
  }
});

exports.addUser = functions.https.onCall(async (data, context) => {
  const res = await db.collection(DB_USERS).add({
    name: data.name,
    timestamp: FieldValue.serverTimestamp(),
  });

  return { result: res };
});

exports.addPlayer = functions.https.onCall(async (data, context) => {
  const res = await db.collection(DB_PLAYERS).add({
    age: data.age,
    weight: data.weight,
    height: data.height,
    timestamp: FieldValue.serverTimestamp(),
  });

  const playerId = res.data.id;
  updateUserListOfPlayers(data.uid, playerId);

  return { result: res };
});

// update the user with the player id
const updateUserListOfPlayers = async (uid, playerId) => {
  const user = await db.collection(DB_USERS).get({ id: uid });
  if (user.playerList) {
    db.doc(DB_USERS + "/" + uid).set({
      ...user,
      playerList: { ...user.playerList, playerId },
    });
  } else {
    db.doc(DB_USERS + "/" + uid).set({ ...user, playerList: { playerId } });
  }
};

exports.writeToFirestore = functions.firestore
  .document("some/doc")
  .onWrite((change, context) => {
    db.doc("some/otherdoc").set({ hi: "hi" });
    return { change: change };
  });
