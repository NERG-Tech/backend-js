const firestore = require("firebase-admin").firestore();
const { signInWithCustomToken, getAuth } = require("firebase/auth");
const DB = require("./db/dbNames");

async function getPlayer(req, res) {
  const auth = getAuth();

  const regex = /Bearer (.+)/i;
  const idToken = req.headers["authorization"].match(regex)?.[1];

  signInWithCustomToken(auth, idToken)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const snapshot = await firestore
        .collection(DB.PLAYERS)
        .doc("one-player")
        .get();

      if (!snapshot.exists) {
        res
          .status(404)
          .json({ error: { code: "player-not-found" }, status: "fail" });
        return;
      }
      const player = snapshot.data();
      res
        .status(200)
        .json({ status: "success", player: player, user: req.user });
    })
    .catch(() => {
      res.status(401).json({
        error: { code: "token-expired" },
      });
    });
}

module.exports = getPlayer;
