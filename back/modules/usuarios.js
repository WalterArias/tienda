const express = require("express");
const cors = require("cors"); // para evitar restricciones entre llamadas de sitios
const usuario = express.Router(); // trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clients
const conex = require("./bdatos");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const secret = process.env.secret;
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //la trae por defecto node js me permite usar async/await opcion a fetch
//const url_permitida = "http://127.0.0.1:5500"; //evitar el error de politicas de cors

//middlewares requeridos
//middlewares: logica de intercambio entre las aplicaciones, traductor de datos entre aplicaciones distribuidas
usuario.use(express.json()); //serializa la data en JSON
usuario.use(cors());
usuario.options("*", cors());

// construimos los endpoint
// listar todos usamos el GET

usuario.get("/usuarios",  (req, res) => {
  try {
  conex.query(
      "SELECT idUsuario,nombre,apellidos,email,imagen FROM usuario",
      (error, respuesta) => {
        res.send(respuesta);
      }
    );
  } catch (error) {
    // throw error;
    console.log(error);
  }
});

usuario.get("/usuarios/:id",  (req, res) =>{
  let id = req.params.id;
  try {
    conex.query(
      "SELECT nombre,apellidos,email FROM usuario where idUsuario = ?",
      id,
      (error, respuesta) => {
        res.json({
          id: respuesta.idUsuario,
          toda: respuesta
        });
      }
    );
  } catch (error) {
    // throw error;
    console.log(error);
  }
});

// subida de la imagen

//configuraciones requeridas por la libreria multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/avatars/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });

usuario.post(
  "/usuarios/upload/:id",
  uploads.single("file0"),
  async (req, res) => {
    try {
      // id de perfil
      let id = req.params.id;
      //cargar nombre del archivo
      let imagenNueva = uploads.filename;
      let imagen = req.file.originalname;

      //sacar extension de archivo
      const imagenExtension = imagen.split(".");
      const extension = imagenExtension[1];
      if (extension != "png" && extension != "jpeg" && extension != "jpg") {
        res.status(505).json({
          mensaje: "error",
          respuesta: error,
        });
      } else {
        let consulta = await conex.query(
          "UPDATE  usuario SET imagen = ? where idUsuario = ?",
          [imagen, id],
          (error, respuesta) => {
            if (error) {
              res.status(505).json({
                mensaje: "error",
                respuesta: error,
              });
            } else {
              res.status(200).json({
                mensaje: "OK",
                respuesta: respuesta,
              });
            }
          }
        );
      }
    } catch (error) {
      res.status(404).json({
        code: error.code,
        mensaje: error.message,
      });
    }
  }
);

// fin de la subida de la imagen

//inserta un usuario
usuario.post("/usuarios/crear", async (req, res) => {
  try {
    let data = {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 7),
      direccion: req.body.direccion,
      ciudad: req.body.ciudad,
      zonapostal: req.body.zonapostal,
      telefono: req.body.telefono,
      esAdmin: req.body.esAdmin,
    };

    let consulta = await conex.query(
      "INSERT INTO usuario SET ?",
      data,
      (error, respuesta) => {
        if (error) {
          res.status(505).json({
            mensaje: "error",
            respuesta: error,
          });
        } else {
          res.status(200).json({
            mensaje: "OK",
            respuesta: respuesta,
          });
        }
      }
    );
  } catch (error) {
    res.send.status(404).json({
      code: error.code,
      mensaje: error.message,
    });
  }
});

//Login de usuario
usuario.post("/usuarios/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    //validamos que lleguen los datos completos
    if (!email || !password) {
      console.log("debe enviar los datos completos");
    } else {
      conex.query(
        "SELECT * FROM usuario where email = ?",
        [email],
        async (error, respuesta) => {
          if (
            respuesta.length == 0 ||
            !(await bcrypt.compare(password, respuesta[0].password))
          ) {
            res.send(false);
          } else {
            // enviamos las variables al frontend para que cargue la pagina
            const token = jwt.sign(
              {
                userId: respuesta[0].idUsuario,
              },
              secret,
              {
                expiresIn: "1d",
              }
            );
            res.send({
              token: token,
            });
            // console.log("BIENVENIDO AL SISTEMA DE INFORMACION");
          }
        }
      );
    }
  } catch (error) {
    console.log("hay un error en la conexión con el server ");
  }
});

module.exports = usuario;
