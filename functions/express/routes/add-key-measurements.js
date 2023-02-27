const firestore = require("firebase-admin").firestore();
const { signInWithCustomToken, getAuth } = require("firebase/auth");
const DB = require("./db/dbNames");

async function addKeyMeasurements(req, res) {
  const auth = getAuth();
  const { idToken } = req.body;

  signInWithCustomToken(auth, idToken)
    .then(async (userCredential) => {
      const {
        neckCircumference,
        wingSpan,
        handSize,
        hipsCircumference,
        gluteCircumference,
        waistCircumference,
      } = req.body;

      const playersDB = firestore.collection(DB.PLAYERS);
      const onePlayer = playersDB.doc("one-player");

      const measure = {
        keyMeasurements: {
          neckCircumference: neckCircumference,
          wingSpan: wingSpan,
          handSize: handSize,
          hipsCircumference: hipsCircumference,
          gluteCircumference: gluteCircumference,
          waistCircumference: waistCircumference,
        },
      };
      const result = await onePlayer.set(measure, { merge: true });

      res.status(200).json({
        result: result,
        measure: measure,
        status: "success",
      });
    })
    .catch(() => {
      res.status(401).json({
        error: { code: "token-expired" },
      });
    });
}

module.exports = addKeyMeasurements;
