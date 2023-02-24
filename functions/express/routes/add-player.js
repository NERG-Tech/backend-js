const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();
// const { getAuth } = require("firebase-admin/auth");
const DB = require("./db/dbNames");

async function addPlayer(req, res) {
  try {
    // weight is in pound & height is in feet
    const { sex, age, weight, height, name, sport, position, user } = req.body;
    const list = formula.calculation(
      sex,
      age,
      weight,
      height,
      name,
      sport,
      position
    );

    const onePlayer = firestore.collection(DB.PLAYERS).doc("one-player");
    const playerId = onePlayer.id;
    await onePlayer.set({ ...list }, { merge: true });

    // return
    res.status(200).json({
      list: list,
      status: "success",
      playerId: playerId,
      uid: user,
      // usersPlayerList: usersPlayerList,
    });
    return;
  } catch (error) {}
}

module.exports = addPlayer;
