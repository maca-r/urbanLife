import { useState, useEffect } from "react";
import axios from "axios";

export function Admin() {
  const [producto, setProducto] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");

  useEffect(() => {
    fetchProductos();
  }, []);

  // Buscar o traer el o los productos

  async function fetchProductos() {
    try {
      const response = await axios.get("URL_DE_TU_API/producto");
      setProducto(response.data);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  }

  //Agregar el producto

  async function añadirProducto() {
    try {
      if (nombreProducto.trim() !== "") {
        const response = await axios.post("URL_DE_TU_API/producto", {
          nombre: nombreProducto,
        });
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
      await axios.delete(`URL_DE_TU_API/producto/${productoId}`);
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
              <button onClick={() => eliminarProducto(producto.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
