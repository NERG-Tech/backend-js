const firestore = require("firebase-admin").firestore();

async function addPlayer(req, res) {
  const { sex, age, weight, height } = req.body;

  console.log(sex, age, weight, height);

  const playersDB = firestore.collection("players");
  const liam = playersDB.doc("one-player");

  await liam
    .set({
      sex: sex,
      age: age,
      height: height,
      weight: weight,
    })
    .then((result) => {
      res.status(200).json({ result: result });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
}

module.exports = addPlayer;
