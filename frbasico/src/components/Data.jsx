import React, { useState, useEffect } from "react";

const Data = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/usuarios")
      .then((res) => {
        return res.json();
      })
      .then((datos) => {
        setDatos(datos);
      });
  }, []);
  console.log(datos);
  //render del componente
  return (
    <>
      <h1>Usuarios</h1>
      <hr />
      {datos.length > 0 || datos == null ? (
        datos.map((dato, key) => {
          return <span key={key}>{dato.nombre}</span>;
        })
      ) : (
        <h2>No hay Informacion !</h2>
      )}
      {/*   {datos.map((dato, key) => {
        return <span key={key}>{dato.nombre}</span>;
      })} */}
    </>
  );
};

export default Data;
