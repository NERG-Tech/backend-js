const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();
const DB = require("./db/dbNames");
const { signInWithCustomToken, getAuth } = require("firebase/auth");

async function getVo2(req, res) {
  const auth = getAuth();
  const { idToken } = req.body;

  signInWithCustomToken(auth, idToken)
    .then(async (userCredential) => {
      const { pulse } = req.body;

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
      const age = playerData.age;

      // get vo2 and set the data into the player db
      const playersDB = firestore.collection(DB.PLAYERS);
      const onePlayer = playersDB.doc("one-player");

      const vo2 = formula.getVo2(parseInt(pulse), parseInt(age));
      const list = {
        vo2: { pulse: pulse, vo2: vo2, unit: "ml/kg/min" },
      };

      // start to update it into db
      const result = await onePlayer.set(list, { merge: true });

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

module.exports = getVo2;
