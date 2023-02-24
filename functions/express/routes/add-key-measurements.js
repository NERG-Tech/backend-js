const firestore = require("firebase-admin").firestore();
// const { getAuth } = require("firebase-admin/auth");

async function addKeyMeasurements(req, res) {
  // weight is in pound & height is in feet
  const {
    neckCircumference,
    wingSpan,
    handSize,
    hipsCircumference,
    gluteCircumference,
    waistCircumference,
  } = req.body;

  // start to update it into db

  const playersDB = firestore.collection("players");
  const onePlayer = playersDB.doc("one-player");

  const measure = {
    keyMeasurements: {
      neckCircumference: neckCircumference,
      wingSpan: wingSpan,
      handSize: handSize,
      hipsCircumference: hipsCircumference,
      gluteCircumference: gluteCircumference,
      waistCircumference: waistCircumference,
    },
  };
  const result = await onePlayer.set(measure, { merge: true });

  res.status(200).json({
    result: result,
    measure: measure,
    status: "success",
  });
}

module.exports = addKeyMeasurements;
