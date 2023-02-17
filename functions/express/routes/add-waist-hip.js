const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();

async function addWaistHip(req, res) {
  // weight is in pound & height is in feet
  const { waist, hip } = req.body;

  const ratio = formula.getWaistToHip(waist, hip);

  // start to update it into db

  const playersDB = firestore.collection("players");
  const onePlayer = playersDB.doc("one-player");

  const result = await onePlayer.set(
    {
      hipAndWaistRatio: { waist: waist, hip: hip, ratio: ratio },
    },
    { merge: true }
  );

  res.status(200).json({
    result: result,
    hipAndWaistRatio: { waist: waist, hip: hip, ratio: ratio },
  });
}

module.exports = addWaistHip;
