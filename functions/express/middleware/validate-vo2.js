function validateVo2(req, res, next) {
  const { pulse } = req.body;

  if (!pulse || isNaN(pulse)) {
    res.status(500).send("no-pulse");
    return;
  }
  next();
}

module.exports = validateVo2;
