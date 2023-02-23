function validateGeneticHealth(req, res, next) {
  const { ethnicity, complexion, bloodType } = req.body;

  if (!ethnicity) {
    res.status(500).send("no-ethnicity");
    return;
  }
  if (!complexion) {
    res.status(500).send("no-complexion");
    return;
  }
  if (!bloodType) {
    res.status(500).send("no-bloodType");
    return;
  }
  next();
}

module.exports = validateGeneticHealth;
