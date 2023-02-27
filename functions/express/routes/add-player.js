const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();
const { signInWithCustomToken, getAuth } = require("firebase/auth");
const DB = require("./db/dbNames");

async function addPlayer(req, res) {
  const auth = getAuth();
  const { idToken } = req.body;

  signInWithCustomToken(auth, idToken)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const { sex, age, weight, height, name, sport, position } = req.body;
      const list = formula.calculation(
        sex,
        age,
        weight,
        height,
        name,
        sport,
        position
      );

      const onePlayer = firestore.collection(DB.PLAYERS).doc("one-player");
      const playerId = onePlayer.id;
      await onePlayer.set({ ...list }, { merge: true });

      const userDoc = await firestore.doc(`${DB.USERS}/${user.uid}`).get();

      let newList = [{ playerId, created: new Date() }];
      if (userDoc.data().playerList) {
        newList = [...userDoc.data().playerList, ...newList];
      }
      const userDoc2 = await firestore
        .doc(`users/${user.uid}`)
        .set({ playerList: newList }, { merge: true });

      // return
      res.status(200).json({
        list: list,
        status: "success",
        playerId: playerId,
        userDoc2: userDoc2,
      });
      return;
    })
    .catch(() => {
      res.status(401).json({
        error: { code: "token-expired" },
      });
    });
}

module.exports = addPlayer;
