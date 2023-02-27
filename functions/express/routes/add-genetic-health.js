const firestore = require("firebase-admin").firestore();
const { signInWithCustomToken, getAuth } = require("firebase/auth");
const DB = require("./db/dbNames");

async function addGeneticHealth(req, res) {
  const { ethnicity, complexion, bloodType, idToken } = req.body;
  const auth = getAuth();

  signInWithCustomToken(auth, idToken)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const playersDB = firestore.collection(DB.PLAYERS);
      const onePlayer = playersDB.doc("one-player");

      const list = {
        geneticHealth: {
          ethnicity: ethnicity,
          complexion: complexion,
          bloodType: bloodType,
        },
      };

      const result = await onePlayer.set(list, { merge: true });

      res.status(200).json({
        result: result,
        list: list,
        status: "success",
      });
    })
    .catch(() => {
      res.status(401).json({
        error: { code: "token-expired" },
      });
    });
}

module.exports = addGeneticHealth;
