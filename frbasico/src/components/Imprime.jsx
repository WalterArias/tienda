import React, { useState, useEffect } from "react";
// instalar libreria 
//npm install @emailjs/browser --save
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
// Create styles
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 12,
  },
  celda1: {
    width: "10%",
    borderRightColor: "black",
    borderRightWidth: 1,
    textAlign: "right",
    marginLeft: 3,
  },
  /*   celda2: {
    display: "flex",
    width: "10%",
    borderRightColor: "black",
    borderRightWidth: 1,
    textAlign: "right",
  }, */
});

// Create Document Component
const Imprime = () => {
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
  const rows = datos.map((dato) => (
    <View style={styles.row} key={dato.idUsuario.toString()}>
      <Text style={styles.celda1}>{dato.nombre}</Text>
      <Text style={styles.celda1}>{dato.email}</Text>
      {/*  <Text style={styles.rate}>{dato.email}</Text>
      <Text style={styles.rate}>{dato.direccion}</Text> */}
    </View>
  ));
  return <>{rows}</>;
};
export default Imprime;
