function validatePlayer(req, res, next) {
  // const { sex, age, weight, height } = req.body;

  // if (!weight) {
  //   res.status(400).send({ error: { code: "no-weight" } });
  //   return;
  // }

  // if (!height) {
  //   res.status(400).send({ error: { code: "no-height" } });
  //   return;
  // }
  // if (!age) {
  //   res.status(400).send({ error: { code: "no-age" } });
  //   return;
  // }
  // if (!sex) {
  //   res.status(400).send({ error: { code: "invalid-sex-type" } });
  //   return;
  // }

  next();
}

module.exports = validatePlayer;
