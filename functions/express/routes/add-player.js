const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();

async function addPlayer(req, res) {
  // weight is in pound & height is in feet
  const { sex, age, weight, height } = req.body;

  const list = formula.calculation(sex, age, weight, height);

  // start to put it into db
  const playersDB = firestore.collection("players");
  const onePlayer = playersDB.doc("one-player");

  const result = await onePlayer.set(list);

  res.status(200).json({ result: result, list: list });
}

module.exports = addPlayer;
