function validateKeyMeasurements(req, res, next) {
  const {
    neckCircumference,
    wingSpan,
    handSize,
    hipsCircumference,
    gluteCircumference,
    waistCircumference,
  } = req.body; // all in inches

  if (!neckCircumference || isNaN(neckCircumference)) {
    res.status(500).send("no-minute");
    return;
  }
  if (!wingSpan || isNaN(wingSpan)) {
    res.status(500).send("no-second");
    return;
  }
  if (!handSize || isNaN(handSize)) {
    res.status(500).send("no-second");
    return;
  }
  if (!hipsCircumference || isNaN(hipsCircumference)) {
    res.status(500).send("no-second");
    return;
  }
  if (!gluteCircumference || isNaN(gluteCircumference)) {
    res.status(500).send("no-second");
    return;
  }
  if (!waistCircumference || isNaN(waistCircumference)) {
    res.status(500).send("no-second");
    return;
  }
  next();
}

module.exports = validateKeyMeasurements;
