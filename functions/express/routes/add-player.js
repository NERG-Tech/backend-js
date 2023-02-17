const firestore = require("firebase-admin").firestore();

async function addPlayer(req, res) {
  const { sex, age, weight, height } = req.body;

  console.log(sex, age, weight, height);

  const playersDB = firestore.collection("players");
  const onePlayer = playersDB.doc("one-player");

  const result = await onePlayer.set({
    sex: sex,
    age: age,
    height: height,
    weight: weight,
  });

  res.status(200).json({ result: result });
}

module.exports = addPlayer;
