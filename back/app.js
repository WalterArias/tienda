// pruerta de entrada de la app  ::: PRINCIPIO SPR SINGLE RESPONSABILITY

const express = require("express");
const app = express(); //creamos nuestra aplicacion llamando el metodo constructor de express
require("dotenv/config");

app.use("/", require("./modules/productos")); //redirigimos al modulo PRODUCTO
app.use("/", require("./modules/usuarios")); //redirigimos al modulo PRODUCTO

app.listen("4000", () => {
  console.log("Aplicacion ejecutandose en : http://localhost:4000");
});
