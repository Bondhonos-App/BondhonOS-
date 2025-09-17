const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, title: "Daily Check-in", reward: 5 },
    { id: 2, title: "Watch a Video", reward: 10 }
  ]);
});

module.exports = router;
