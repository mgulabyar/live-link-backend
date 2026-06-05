const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");
const linkRoutes = require("./routes/linkRoutes"); 

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDatabase();

app.use("/api/links", linkRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    database: "CONNECTED",
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
