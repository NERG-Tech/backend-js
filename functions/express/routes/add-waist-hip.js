const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();
const { getAuth } = require("firebase-admin/auth");

async function addWaistHip(req, res) {
  try {
    const { idToken } = req.body;

    getAuth()
      .verifyIdToken(idToken)
      .then(async (decodedToken) => {
        const uid = decodedToken.uid;

        // weight is in pound & height is in feet
        const { waist, hip } = req.body;
        const ratio = formula.getWaistToHip(waist, hip);

        const playersDB = firestore.collection("players");
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
          // uid: uid,
        });
      })
      .catch((error) => {
        res.status(200).json({ status: "fail", error: error });
      });
  } catch (err) {
    res
      .status(401)
      .json({ error: { code: "unauthenticated" }, status: "fail" });
  }
}

module.exports = addWaistHip;
