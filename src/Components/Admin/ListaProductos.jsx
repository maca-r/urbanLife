import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function ListaProductos() {
  const [producto, setProducto] = useState([]);
  const [productoId, setProductoId] = useState("");
  const [productoImagenes, setProductoImagenes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productoToDelete, setProductoToDelete] = useState(null);
  const [noProductosMessage, setNoProductosMessage] = useState("");

  useEffect(() => {
    fetchProductos();
  }, []);

  async function fetchProductos() {
    try {
      const response = await axios.get(
        "http://localhost:80/productos/listaproductos-all"
      );
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

  async function fetchProductoPorId(id) {
    try {
      const response = await axios.get(
        `http://localhost:80/productos/obtener/${id}`
      );
      setProductoId(response.data);
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
    }
  }

  function showDeleteConfirmation(producto) {
    setProductoToDelete(producto);
    setShowDeleteModal(true);
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
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  }

  return (
    <section>
      <div>
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

                    <Link to={`/editarproducto/${producto.idProducto}`}>
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
                      <DeleteIcon />
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
