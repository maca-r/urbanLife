import axios from "axios";
import { useEffect, useState } from "react";

export function ListaPropductos() {
  const [producto, setProducto] = useState([]);
  const [productoId, setProductoId] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  async function fetchProductos() {
    try {
      const response = await axios.get("http://localhost/productos");
      setProducto(response.data);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  }

  async function fetchProductoPorId(id) {
    try {
      const response = await axios.get(`http://localhost/productos/${id}`);
      setProductoId(response.data);
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
    }
  }

  async function eliminarProducto(productoId) {
    try {
      await axios.delete(`http://localhost/productos/eliminar/${productoId}`);
      const actProducto = producto.filter(
        (producto) => producto.id !== productoId
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
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>
                  <button onClick={() => fetchProductoPorId(producto.id)}>
                    Ver Detalles
                  </button>
                  <button onClick={() => eliminarProducto(producto.id)}>
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
          <p>Nombre: {productoId.nombre}</p>
        </div>
      )}
    </section>
  );
}
