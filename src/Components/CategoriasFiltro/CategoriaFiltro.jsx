import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContextoGlobal } from "../GlobalContext";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import styles from "./CategoriaFiltro.module.css";

const CategoriaFiltro = () => {
  const [categoria, setCategoria] = useState();

  const { dataState } = useContextoGlobal();

  const productosCategoria = [];

  const params = useParams();

  const id = params.id;

  //console.log(`http://localhost/categorias/${id}`);

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const urlCategoria =
    privateUrl != ""
      ? `${privateUrl}:80/categorias/categorias/${id}`
      : `${publicUrl}:80/categorias/categorias/${id}`;

  useEffect(() => {
    try {
      axios.get(urlCategoria).then((response) => {
        console.log(response.data);
        setCategoria(response.data);
      });
    } catch (error) {
      console.error("error al obtener categorias");
    }
  }, [urlCategoria]);

  const filtradoProducto = () => {
    dataState.productos.forEach((producto) => {
      if (producto.categorias.idCategoria == id) {
        //console.log(producto);
        productosCategoria.push(producto);
      }
    });
  };

  filtradoProducto();

  return (
    <div className={styles.categorias}>
      {categoria?.titulo && (
        <h4 className={styles.tituloFiltroCat}>{categoria.titulo}</h4>
      )}
      <h4>Productos en esta categoria:</h4>
      <div className={styles.gridProductos}>
        {productosCategoria.map((producto, index) => (
          <Card data={producto} key={index}></Card>
        ))}
      </div>
    </div>
  );
};

export default CategoriaFiltro;
