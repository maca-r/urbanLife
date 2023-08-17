import axios from "axios";
import { useEffect, useState } from "react";

export function ListaProductos() {
  const [producto, setProducto] = useState([]);
  const [productoId, setProductoId] = useState("");
  const [categoriaId, setCategoriaId] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  async function fetchProductos() {
    try {
      const response = await axios.get("http://localhost:80/productos");
      setProducto(response.data);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  }

  async function fetchProductoPorId(id) {
    try {
      const response = await axios.get(`http://localhost:80/productos/${id}`);
      setProductoId(response.data);
      fetchCategoriaPorId(response.data.idCategoria);
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
    }
  }

  async function fetchCategoriaPorId() {
    try {
      const response = await axios.get(`http://localhost:80/categorias/listar`);
      setCategoriaId(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(
        `Error al obtener la categoría con ID ${categoriaId}:`,
        error
      );
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

  return (
    <section>
      <div>
        <h3>Listado de Productos</h3>
        <table>
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
                  <button
                    onClick={() => fetchProductoPorId(producto.idProducto)}
                  >
                    Ver Detalles
                  </button>

                  <button onClick={() => eliminarProducto(producto.idProducto)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {productoId && (
        <div>
          <h3>Detalles del Producto</h3>
          <p>ID Producto: {productoId.idProducto}</p>
          <p>Nombre: {productoId.nombre}</p>
          <p>Color: {productoId.color}</p>
          <p>Detalle: {productoId.detalle}</p>
          <p>Precio: ${productoId.precio}</p>
          {/* <p>Caracteristica: {productoId.caracteristica}</p> */}
          <p>ID Catategoria: {productoId.categorias.idCategoria}</p>
          <p>Nombre categoria: {productoId.categorias.nombreCategoria}</p>
        </div>
      )}
    </section>
  );
}
