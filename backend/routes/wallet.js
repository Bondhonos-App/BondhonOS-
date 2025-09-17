const express = require("express");
const router = express.Router();

let balance = 0;

router.get("/", (req, res) => {
  res.json({ balance });
});

router.post("/add", (req, res) => {
  balance += req.body.amount || 0;
  res.json({ balance });
});

module.exports = router;
