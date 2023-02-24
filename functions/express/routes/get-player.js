const firestore = require("firebase-admin").firestore();

// get request
async function getPlayer(req, res) {
  try {
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
    res.status(200).json({ status: "success", player: player, user: req.user });
  } catch (error) {
    res.status(404).json({ error: { code: "error" }, status: "fail" });
    return;
  }
}

module.exports = getPlayer;
