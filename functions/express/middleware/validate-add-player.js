function validatePlayer(req, res, next) {
  const { sex, age, weight, height, name, sport, position } = req.body;

  if (!weight || isNaN(weight)) {
    res.status(500).send("no-weight");
    return;
  }
  if (!height || isNaN(height)) {
    res.status(500).send({ error: "no-height" });
    // res.status(500).json({ error: "no-weight" });
    return;
  }
  if (!age || isNaN(age)) {
    res.status(500).send({ error: "no-age" });
    // res.status(400).json({ error: { code: "no-age" } });
    return;
  }
  if (!sex) {
    res.status(500).send({ error: "no-sex" });
    // res.status(400).json({ error: { code: "no-sex-type" } });
    return;
  }
  if (sex !== "Male" && sex !== "Female") {
    res.status(500).send({ error: "invalid-sex-type" });
    // res.status(400).json({ error: { code: "invalid-sex-type" } });
    return;
  }

  next();
}

module.exports = validatePlayer;
