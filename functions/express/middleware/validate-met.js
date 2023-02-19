function validateMet(req, res, next) {
  const { minutes, seconds } = req.body;

  if (!minutes || isNaN(minutes)) {
    res.status(500).send("no-minute");
    return;
  }
  if (!seconds || isNaN(seconds)) {
    res.status(500).send("no-second");
    return;
  }
  next();
}

module.exports = validateMet;
