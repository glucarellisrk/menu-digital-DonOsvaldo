const express = require("express");
const app = express();

let menuData = {}; // Almacena los datos del menú

app.use(express.json());

app.get("/menuData", (req, res) => {
  res.json(menuData);
});

app.post("/menuData", (req, res) => {
  menuData = req.body;
  res.sendStatus(200);
});

app.listen(3001, () => {
  console.log("API corriendo en el puerto 3001");
});