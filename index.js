const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();

// Configuración de CORS para permitir peticiones del test runner
app.use(cors());

// Servir archivos estáticos
app.use("/public", express.static(process.cwd() + "/public"));

// Ruta de inicio
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Configurar multer para almacenar en memoria
const upload = multer({
  storage: multer.memoryStorage()
});

// API de Metadatos de Archivo
// Se añade el middleware de upload y se fuerzan los headers para evitar bloqueos
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Fuerza los headers para que el test runner de FCC no bloquee la respuesta
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Iniciar servidor
const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
