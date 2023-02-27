const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();
const { signInWithCustomToken, getAuth } = require("firebase/auth");
const DB = require("./db/dbNames");

async function addWaistHip(req, res) {
  const auth = getAuth();
  const { idToken } = req.body;

  signInWithCustomToken(auth, idToken)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const { waist, hip } = req.body;
      const ratio = formula.getWaistToHip(waist, hip);

      const playersDB = firestore.collection(DB.PLAYERS);
      const onePlayer = playersDB.doc("one-player");

      const result = await onePlayer.set(
        {
          hipAndWaistRatio: { waist: waist, hip: hip, ratio: ratio },
        },
        { merge: true }
      );

      res.status(200).json({
        status: "success",
        ratio: { waist: waist, hip: hip, ratio: ratio },
        result: result,
      });
    })
    .catch(() => {
      res.status(401).json({
        error: { code: "token-expired" },
      });
    });
}

module.exports = addWaistHip;
