function validateGeneticHealth(req, res, next) {
  const { ethnicity, complexion, bloodType } = req.body;

  if (!ethnicity || isNaN(ethnicity)) {
    res.status(500).send("no-ethnicity");
    return;
  }
  if (!complexion || isNaN(complexion)) {
    res.status(500).send("no-complexion");
    return;
  }
  if (!bloodType || isNaN(bloodType)) {
    res.status(500).send("no-bloodType");
    return;
  }
  next();
}

module.exports = validateGeneticHealth;
