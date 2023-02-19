const firestore = require("firebase-admin").firestore();

async function addGeneticHealth(req, res) {
  // weight is in pound & height is in feet
  const { ethnicity, complexion, bloodType } = req.body;

  // get vo2 and set the data into the player db
  const playersDB = firestore.collection("players");
  const onePlayer = playersDB.doc("one-player");

  const list = {
    geneticHealth: {
      ethnicity: ethnicity,
      complexion: complexion,
      bloodType: bloodType,
    },
  };
  // start to update it into db
  const result = await onePlayer.set(list, { merge: true });

  res.status(200).json({
    result: result,
    list: list,
  });
}

module.exports = addGeneticHealth;