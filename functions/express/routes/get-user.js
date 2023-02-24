const firestore = require("firebase-admin").firestore();
const DB = require("./db/dbNames");

async function getUser(req, res) {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).json({ error: { code: "no-user-id" }, status: "fail" });
    return;
  }

  if (userId !== req.token.uid) {
    res.status(403).json({ error: { code: "unauthorized" }, status: "fail" });
  }

  const snapshot = await firestore.collection(DB.USERS).doc(userId).get();
  if (!snapshot.exists) {
    res.status(404).json({ error: { code: "user-not-found" }, status: "fail" });
    return;
  }
  const user = snapshot.data();

  res.status(200).json({ secureNote: user.secureNote, status: "success" });
}

module.exports = getUser;
