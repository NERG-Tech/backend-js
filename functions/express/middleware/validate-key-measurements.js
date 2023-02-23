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
    res.status(500).send("no-neckCircumference");
    return;
  }
  if (!wingSpan || isNaN(wingSpan)) {
    res.status(500).send("no-sewingSpancond");
    return;
  }
  if (!handSize || isNaN(handSize)) {
    res.status(500).send("no-handSize");
    return;
  }
  if (!hipsCircumference || isNaN(hipsCircumference)) {
    res.status(500).send("no-hipsCircumference");
    return;
  }
  if (!gluteCircumference || isNaN(gluteCircumference)) {
    res.status(500).send("no-gluteCircumference");
    return;
  }
  if (!waistCircumference || isNaN(waistCircumference)) {
    res.status(500).send("no-waistCircumference");
    return;
  }
  next();
}

module.exports = validateKeyMeasurements;
