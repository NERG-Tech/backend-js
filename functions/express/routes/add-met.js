const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();

async function getMet(req, res) {
  // weight is in pound & height is in feet
  const { minutes, seconds } = req.body;

  // get the sex from db
  const snapshot = await firestore
    .collection("players")
    .doc("one-player")
    .get();
  if (!snapshot.exists) {
    res.status(404).json({ error: { code: "user-not-found" } });
    return;
  }
  const playerData = snapshot.data();
  const sex = playerData.sex;

  const met = formula.getMET(sex, minutes, seconds);
  const list = { met: { value: met, unit: "METs" } };

  //   // get vo2 and set the data into the player db
  const result = await firestore
    .collection("players")
    .doc("one-player")
    .set(list, { merge: true });

  res.status(200).json({
    result: result,
    list: list,
    player: playerData,
  });
}

module.exports = getMet;
