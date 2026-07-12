const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();

// Enable CORS
app.use(cors());

// Serve static files
app.use("/public", express.static(process.cwd() + "/public"));

// Home page
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Configure multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage()
});

// File Metadata API
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: "No file uploaded"
    });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
