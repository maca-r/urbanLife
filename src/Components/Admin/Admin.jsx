import { useState, useEffect } from "react";
import axios from "axios";

export function Admin() {
  const [producto, setProducto] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [productoId, setProductoId] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  // Buscar o traer el o los productos
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

  //Agregar el producto

  async function añadirProducto() {
    try {
      if (nombreProducto.trim() !== "") {
        const response = await axios.post(
          "http://localhost/productos/registrar",
          {
            nombre: nombreProducto,
          }
        );
        setProducto([...producto, response.data]);
        setNombreProducto("");
      }
    } catch (error) {
      console.error("Error al añadir producto:", error);
    }
  }

  // Eliminar el producto

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
      <h2>Panel de Administración</h2>
      <div>
        <h3>Añadir un producto</h3>
        <input
          type="text"
          value={nombreProducto}
          onChange={(e) => setNombreProducto(e.target.value)}
        />
        <button onClick={añadirProducto}>Añadir</button>
      </div>
      <div>
        <h3>Listado de Productos</h3>
        <ul>
          {producto.map((producto) => (
            <li key={producto.id}>
              {producto.nombre}
              <button onClick={() => fetchProductoPorId(producto.id)}>
                Ver Detalles
              </button>
              <button onClick={() => eliminarProducto(producto.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
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
