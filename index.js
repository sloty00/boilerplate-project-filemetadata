const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();

// Middleware básico
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

// Ruta de la interfaz
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Configuración de multer en memoria
const upload = multer({ storage: multer.memoryStorage() });

// API de Metadatos de Archivo
// Se utiliza 'upfile' como nombre del campo para cumplir el test #3
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Respuesta directa en formato JSON puro
  // El middleware cors() ya gestiona los headers necesarios automáticamente
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
