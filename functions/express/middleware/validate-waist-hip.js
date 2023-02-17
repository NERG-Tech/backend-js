function validatePlayer(req, res, next) {
  const { waist, hip } = req.body;

  if (!waist || isNaN(waist)) {
    res.status(500).send("no-waist");
    return;
  }
  if (!hip || isNaN(hip)) {
    res.status(500).send({ error: "no-hip" });
    return;
  }

  next();
}

module.exports = validatePlayer;
