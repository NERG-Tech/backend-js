const firestore = require("firebase-admin").firestore();

async function getPlayer(req, res) {
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
}

module.exports = getPlayer;
