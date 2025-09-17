const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BondhonOS Backend Running ✅");
});

app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/tasks"));
app.use("/wallet", require("./routes/wallet"));

app.listen(5000, () => console.log("Backend running on port 5000"));
