import axios from "axios";
import { useEffect, useState } from "react";
import { useContextoGlobal } from "../GlobalContext";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import styles from "./CategoriaFiltro.module.css";
import Alert from "react-bootstrap/Alert";

const CategoriaFiltro = () => {
  const [categoria, setCategoria] = useState();
  const { dataState } = useContextoGlobal();
  const [productosCategoria, setProductosCategoria] = useState([]);

  const params = useParams();
  const id = params.id;

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const urlCategoria =
    privateUrl !== ""
      ? `${privateUrl}:80/categorias/categorias/${id}`
      : `${publicUrl}:80/categorias/categorias/${id}`;

  useEffect(() => {
    try {
      axios.get(urlCategoria).then((response) => {
        console.log(response.data);
        setCategoria(response.data);
      });
    } catch (error) {
      console.error("error al obtener categorías");
    }
  }, [urlCategoria]);

  useEffect(() => {
    const filteredProductos = dataState.productos.filter(
      (producto) =>
        producto.categorias.idCategoria == id && !producto.eliminarProducto
    );
    setProductosCategoria(filteredProductos);
  }, [dataState.productos, id]);

  return (
    <div className={styles.categorias}>
      {categoria?.titulo && (
        <h4 className={styles.tituloFiltroCat}>{categoria.titulo}</h4>
      )}
      <h4>Productos en esta categoría:</h4>
      {productosCategoria.length === 0 ? (
        <Alert variant="warning">
          No hay productos disponibles en esta categoría.
        </Alert>
      ) : (
        <div className={styles.gridProductos}>
          {productosCategoria.map((producto, index) => (
            <Card data={producto} key={index}></Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriaFiltro;
