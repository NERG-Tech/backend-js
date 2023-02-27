const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();
const { signInWithCustomToken, getAuth } = require("firebase/auth");
const DB = require("./db/dbNames");

async function getMetValue(req, res) {
  const auth = getAuth();
  const { idToken } = req.body;

  signInWithCustomToken(auth, idToken)
    .then(async (userCredential) => {
      const { minutes, seconds } = req.body;

      // get the sex from db
      const snapshot = await firestore
        .collection(DB.PLAYERS)
        .doc("one-player")
        .get();
      if (!snapshot.exists) {
        res
          .status(404)
          .json({ error: { code: "user-not-found" }, status: "fail" });
        return;
      }
      const playerData = snapshot.data();
      const sex = playerData.sex;

      const time = parseInt(minutes) + parseInt(seconds) * 0.0165;

      const met = formula.getMET(sex, time);
      const list = { met: { value: met, unit: "METs", minutes, seconds } };

      const result = await firestore
        .collection(DB.PLAYERS)
        .doc("one-player")
        .set(list, { merge: true });

      res.status(200).json({
        result: result,
        list: list,
        player: playerData,
        status: "success",
      });
    })
    .catch(() => {
      res.status(401).json({
        error: { code: "token-expired" },
      });
    });
}

module.exports = getMetValue;
