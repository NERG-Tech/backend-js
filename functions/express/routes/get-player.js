const firestore = require("firebase-admin").firestore();
const { getAuth } = require("firebase-admin/auth");

// get request
async function getPlayer(req, res) {
  try {
    const idToken = req.params.idToken;

    getAuth()
      .verifyIdToken(idToken)
      .then(async (decodedToken) => {
        const uid = decodedToken.uid;

        const snapshot = await firestore
          .collection("players")
          .doc("one-player")
          .get();

        if (!snapshot.exists) {
          res
            .status(404)
            .json({ error: { code: "player-not-found" }, status: "fail" });
          return;
        }
        const player = snapshot.data();
        res.status(200).json({ status: "success", player: player });
      })
      .catch((error) => {
        res
          .status(401)
          .json({ error: "token-invalid", status: "fail", errorMsg: error });
      });
  } catch (error) {
    res.status(404).json({ error: { code: "error" }, status: "fail" });
    return;
  }
}

module.exports = getPlayer;
