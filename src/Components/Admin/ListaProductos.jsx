import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function ListaProductos() {
  const [producto, setProducto] = useState([]);
  const [productoId, setProductoId] = useState("");
  const [productoImagenes, setProductoImagenes] = useState([]);
  const [productoTalles, setProductoTalles] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productoToDelete, setProductoToDelete] = useState(null);
  const [noProductosMessage, setNoProductosMessage] = useState("");

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const urlListarProductos =
    privateUrl != ""
      ? `${privateUrl}:80/productos/listaproductos-all`
      : `${publicUrl}:80/productos/listaproductos-all`;

  useEffect(() => {
    fetchProductos();
  }, []);

  // async function fetchProductos() {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:80/productos/listaproductos-all"
  //     );
  //     setProducto(response.data);

  //     if (response.data.length === 0) {
  //       setNoProductosMessage("No hay productos disponibles.");
  //     } else {
  //       setNoProductosMessage("");
  //     }
  //   } catch (error) {
  //     console.error("Error al obtener los productos:", error);
  //   }
  // }

  async function fetchProductos() {
    try {
      const response = await axios.get(urlListarProductos);
      setProducto(response.data);

      if (response.data.length === 0) {
        setNoProductosMessage("No hay productos disponibles.");
      } else {
        setNoProductosMessage("");
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  const params = useParams();

  const urlListarProductosId =
    privateUrl != ""
      ? `${privateUrl}:80/productos/obtener/${params.id}`
      : `${publicUrl}:80/productos/obtener/${params.id}`;

  // async function fetchProductoPorId(id) {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:80/productos/obtener/${id}`
  //     );
  //     setProductoId(response.data);
  //     fetchImagenesProducto(id);
  //     fetchTallesProducto(id);
  //   } catch (error) {
  //     console.error(`Error al obtener el producto con ID ${id}:`, error);
  //   }
  // }

  async function fetchProductoPorId() {
    try {
      const response = await axios.get(urlListarProductosId);
      setProductoId(response.data);
      fetchImagenesProducto(params.id);
      fetchTallesProducto(params.id);
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${params.id}:`, error);
    }
  }

  const urlImagenesId =
    privateUrl != ""
      ? `${privateUrl}:80/imagenes/obtener/${params.id}`
      : `${publicUrl}:80/imagenes/obtener/${params.id}`;

  // async function fetchImagenesProducto(id) {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:80/imagenes/obtener/${id}`
  //     );
  //     setProductoImagenes(response.data);
  //   } catch (error) {
  //     console.error(
  //       `Error al obtener las imágenes del producto con ID ${id}:`,
  //       error
  //     );
  //   }
  // }

  async function fetchImagenesProducto() {
    try {
      const response = await axios.get(urlImagenesId);
      setProductoImagenes(response.data);
    } catch (error) {
      console.error(
        `Error al obtener las imágenes del producto con ID ${params.id}:`,
        error
      );
    }
  }

  const urlTallesId =
    privateUrl != ""
      ? `${privateUrl}:80/talles/listatalles-producto/${params.id}`
      : `${publicUrl}:80/talles/listatalles-producto/${params.id}`;

  // async function fetchTallesProducto(id) {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:80/talles/listatalles-producto/${id}`
  //     );
  //     setProductoTalles(response.data);
  //   } catch (error) {
  //     console.error(
  //       `Error al obtener los talles del producto con ID ${id}:`,
  //       error
  //     );
  //   }
  // }

  async function fetchTallesProducto() {
    try {
      const response = await axios.get(urlTallesId);
      setProductoTalles(response.data);
    } catch (error) {
      console.error(
        `Error al obtener los talles del producto con ID ${params.id}:`,
        error
      );
    }
  }

  function showDeleteConfirmation(producto) {
    setProductoToDelete(producto);
    setShowDeleteModal(true);
  }

  const urlEliminarProducto =
    privateUrl != ""
      ? `${privateUrl}:80/productos/eliminar/${params.id}`
      : `${publicUrl}:80/productos/eliminar/${params.id}`;

  // async function eliminarProducto(productoId) {
  //   try {
  //     await axios.delete(
  //       `http://localhost:80/productos/eliminar/${productoId}`
  //     );
  //     const actProducto = producto.filter(
  //       (producto) => producto.idProducto !== productoId
  //     );
  //     setProducto(actProducto);
  //     setShowDeleteModal(false);
  //   } catch (error) {
  //     console.error("Error al eliminar producto:", error);
  //   }
  // }

  async function eliminarProducto() {
    try {
      await axios.delete(urlEliminarProducto);
      const actProducto = producto.filter(
        (producto) => producto.idProducto !== productoId
      );
      setProducto(actProducto);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  }

  return (
    <section>
      <div style={{ margin: "2%" }}>
        <h3>Listado de Productos</h3>
        {noProductosMessage && <p>{noProductosMessage}</p>}
        {producto.length > 0 && (
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
                    <Button
                      variant="secondary"
                      size="sm"
                      style={{ marginRight: "5px" }}
                      onClick={() => fetchProductoPorId(producto.idProducto)}
                    >
                      Ver Detalles
                    </Button>

                    <Link to={`/editar/${producto.idProducto}`}>
                      <Button
                        variant="warning"
                        size="sm"
                        style={{ marginRight: "5px" }}
                      >
                        <EditIcon style={{ color: "#2b2b28" }} />
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      size="sm"
                      style={{ marginRight: "5px" }}
                      onClick={() => showDeleteConfirmation(producto)}
                    >
                      Eliminar Producto
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      {productoId && (
        <div>
          <h3>Detalles del Producto</h3>
          <p>ID Producto: {productoId.idProducto}</p>
          <p>Nombre: {productoId.nombre}</p>
          <p>Color: {productoId.color}</p>
          <p>Detalle: {productoId.detalle}</p>
          <p>Precio: ${productoId.precio}</p>
          <p>Corte: {productoId.corte}</p>
          <p>Genero: {productoId.genero}</p>
          <p>Tela: {productoId.tela}</p>
          <p>Temporada: {productoId.temporada}</p>
          <p>ID Categoria: {productoId.categorias.idCategoria}</p>
          <p>Nombre categoria: {productoId.categorias.titulo}</p>

          {productoTalles.length > 0 && (
            <div>
              <h4>Talles de este producto</h4>
              <ul>
                {productoTalles.map((talle) => (
                  <li key={talle.idMedida}>{talle.talle}</li>
                ))}
              </ul>
            </div>
          )}

          {productoImagenes.length > 0 && (
            <div>
              <h4>Imágenes de este producto</h4>
              {productoImagenes.map((img) => (
                <div key={img.idImagen}>
                  <img
                    src={img.urlImagen}
                    alt={`ID de la imagen: ${img.idImagen}`}
                    style={{ maxWidth: "100px" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¿Seguro que quieres eliminar este producto?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => eliminarProducto(productoToDelete.idProducto)}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
