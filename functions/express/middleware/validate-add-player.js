function validatePlayer(req, res, next) {
  const { sex, age, weight, height, name, sport, position } = req.body;

  if (!weight || isNaN(weight)) {
    res.status(500).send("no-weight");
    return;
  }
  if (!height || isNaN(height)) {
    res.status(500).send({ error: "no-height" });
    return;
  }
  if (!age || isNaN(age)) {
    res.status(500).send({ error: "no-age" });
    return;
  }
  if (!sex) {
    res.status(500).send({ error: "no-sex" });
    return;
  }
  if (sex !== "Male" && sex !== "Female") {
    res.status(500).send({ error: "invalid-sex-type" });
    return;
  }
  if (!name) {
    res.status(500).send({ error: "no-name" });
    return;
  }
  if (!sport) {
    res.status(500).send({ error: "no-sport" });
    return;
  }
  if (!position) {
    res.status(500).send({ error: "no-position" });
    return;
  }
  if (
    sex === "Male" ||
    sex === "male" ||
    sex === "female" ||
    sex === "Female"
  ) {
    next();
  } else {
    res.status(500).send({ error: "invalid-sex-type" });
    return;
  }
}

module.exports = validatePlayer;
