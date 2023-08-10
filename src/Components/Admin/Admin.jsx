import { useEffect, useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import styles from './Admin.module.css'

export function Admin() {
  // const [producto, setProducto] = useState([]);
  // const [nombreProducto, setNombreProducto] = useState("");
  // const [productoId, setProductoId] = useState(null);

  // async function fetchProductoPorId(id) {
  //   try {
  //     const response = await axios.get(`http://localhost/productos/${id}`);
  //     setProductoId(response.data);
  //   } catch (error) {
  //     console.error(`Error al obtener el producto con ID ${id}:`, error);
  //   }
  // }

  //Agregar el producto

  // async function añadirProducto() {
  //   try {
  //     if (nombreProducto.trim() !== "") {
  //       const response = await axios.post(
  //         "http://localhost/productos/registrar",
  //         {
  //           nombre: nombreProducto,
  //         }
  //       );
  //       setProducto([...producto, response.data]);
  //       setNombreProducto("");
  //     }
  //   } catch (error) {
  //     console.error("Error al añadir producto:", error);
  //   }
  // }

  // Eliminar el producto

  // async function eliminarProducto(productoId) {
  //   try {
  //     await axios.delete(`http://localhost/productos/eliminar/${productoId}`);
  //     const actProducto = producto.filter(
  //       (producto) => producto.id !== productoId
  //     );
  //     setProducto(actProducto);
  //   } catch (error) {
  //     console.error("Error al eliminar producto:", error);
  //   }
  // }

  const [alertaResponsive, setAlertaResponsive] = useState(false)
  const [dimensions, setDimensions] = useState(window.innerWidth)

    useEffect(() => {
      function handleResize() {
          if(dimensions >= 480) {
            setAlertaResponsive(false)
            setDimensions(window.innerWidth)
      } else{

      setAlertaResponsive(true)
        }

        }
        window.addEventListener("load",handleResize)
        window.addEventListener("resize", handleResize)

    },[dimensions])

  return (
    <>
    <h2>Panel de Administración</h2>
    {alertaResponsive && <h3>El panel de administrador sólo está disponible para versión desktop</h3>}
    
    <section className={styles.sectionDesktop}>
      
      
      <Link to="/listaproductos">
        <button>Lista Productos</button>
      </Link>
      <Link to="/añadirproducto">
        <button>Agregar Producto</button>
      </Link>
      {/* <div>
        <h3>Añadir un producto</h3>
        <input
          type="text"
          value={nombreProducto}
          onChange={(e) => setNombreProducto(e.target.value)}
        />
        <button onClick={añadirProducto}>Añadir</button>
      </div> */}
      {/* <div>
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
      </div> */}
      {/* {productoId && (
        <div>
          <h3>Detalles del Producto</h3>
          <p>Nombre: {productoId.nombre}</p>
        </div>
      )} */}
    </section>
    </>
    
  );
}
