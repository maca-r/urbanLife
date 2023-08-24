import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export function ListaProductos() {
  const [producto, setProducto] = useState([]);
  const [productoId, setProductoId] = useState("");
  const [productoImagenes, setProductoImagenes] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  async function fetchProductos() {
    try {
      const response = await axios.get(
        "http://localhost:80/productos/listaproductos-all"
      );
      setProducto(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  async function fetchProductoPorId(id) {
    try {
      const response = await axios.get(`http://localhost:80/productos/${id}`);
      setProductoId(response.data);
      // fetchImagenesPorProducto(id);
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
    }
  }

  async function eliminarProducto(productoId) {
    try {
      await axios.delete(
        `http://localhost:80/productos/eliminar/${productoId}`
      );
      const actProducto = producto.filter(
        (producto) => producto.idProducto !== productoId
      );
      setProducto(actProducto);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  }

  // async function fetchImagenesPorProducto(idProducto) {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:80/imagenes/${idProducto}`
  //     );
  //     setProductoImagenes(response.data);
  //   } catch (error) {
  //     console.error(
  //       `Error al obtener las imágenes del producto ${idProducto}:`,
  //       error
  //     );
  //   }
  // }

  return (
    <section>
      <div>
        <h3>Listado de Productos</h3>
        <Table striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {producto.map((producto) => (
              <tr key={producto.idProducto}>
                <td>{producto.idProducto}</td>
                <td>{producto.nombre}</td>

                <td>
                  <Button variant="info" size="sm" style={{marginRight:"5px"}}
                    onClick={() => fetchProductoPorId(producto.idProducto)}
                  >
                    Ver Detalles
                  </Button>

                  <Link to={`/editarproducto/${producto.idProducto}`}>
                    <Button variant="warning" size="sm" style={{marginRight:"5px"}}>Editar</Button>
                  </Link>
                  <Button variant="danger" size="sm" style={{marginRight:"5px"}} onClick={() => eliminarProducto(producto.idProducto)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {productoId && (
        <div>
          <h3>Detalles del Producto</h3>
          <p>ID Producto: {productoId.idProducto}</p>
          <p>Nombre: {productoId.nombre}</p>
          <p>Color: {productoId.color}</p>
          <p>Detalle: {productoId.detalle}</p>
          <p>Precio: ${productoId.precio}</p>
          <p>Evento: {productoId.evento}</p>
          <p>Genero: {productoId.genero}</p>
          <p>Tela: {productoId.tela}</p>
          <p>Temporada: {productoId.temporada}</p>
          <p>ID Catategoria: {productoId.categorias.idCategoria}</p>
          <p>Nombre categoria: {productoId.categorias.nombreCategoria}</p>
          {/* <p>Nombre talles: {productoId.talles}</p>
          <p>Nombre talles: {productoId.talle}</p> */}

          {productoImagenes.map((img) => (
            <div key={img.idImagen}>
              <div>
                <h4>Imagenes de este producto</h4>
                <img
                  src={img.urlImagen}
                  alt={`Imagen del producto ${img.idImagen}`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
