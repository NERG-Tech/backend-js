async function test(req, res) {
  res.status(200).json({ status: "test-success", uid: req.uid });
}

module.exports = test;
