const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();
// const { getAuth } = require("firebase-admin/auth");
const DB = require("./db/dbNames");

async function addWaistHip(req, res) {
  try {
    // weight is in pound & height is in feet
    const { waist, hip } = req.body;
    const ratio = formula.getWaistToHip(waist, hip);

    const playersDB = firestore.collection(DB.PLAYERS);
    const onePlayer = playersDB.doc("one-player");

    const result = await onePlayer.set(
      {
        hipAndWaistRatio: { waist: waist, hip: hip, ratio: ratio },
      },
      { merge: true }
    );

    res.status(200).json({
      status: "success",
      ratio: { waist: waist, hip: hip, ratio: ratio },
      result: result,
    });
  } catch (err) {
    res.status(401).json({ error: err, status: "fail" });
  }
}

module.exports = addWaistHip;
