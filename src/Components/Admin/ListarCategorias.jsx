import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function ListarCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState(null);

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const storedToken = localStorage.getItem("token");

  const urlListarCategorias =
    privateUrl != ""
      ? `${privateUrl}:80/categorias/listarcategorias-all`
      : `${publicUrl}:80/categorias/listarcategorias-all`;

  useEffect(() => {
    axios
      .get(urlListarCategorias)
      .then((response) => {
        const categoriasNoEliminadas = response.data.filter(
          (categoria) => categoria.eliminarCategoria === false
        );
        setCategorias(categoriasNoEliminadas);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
        setLoading(false);
      });
  }, []);

  const eliminarCategoria = (idCategoria) => {
    if (!idCategoria) {
      console.error("No se ha seleccionado ninguna categoría para eliminar.");
      return;
    }

    const urlEliminarCategoria =
      privateUrl != ""
        ? `${privateUrl}:80/categorias/${idCategoria}/eliminar`
        : `${publicUrl}:80/categorias/${idCategoria}/eliminar`;

    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };

    axios
      .delete(urlEliminarCategoria, { headers })
      .then(() => {
        const updatedCategorias = categorias.filter(
          (categoria) => categoria.idCategoria !== idCategoria
        );
        setCategorias(updatedCategorias);
        setShowConfirmModal(false);
      })
      .catch((error) => {
        console.error(
          `Error al eliminar la categoría con ID ${idCategoria}:`,
          error
        );
      });
  };

  const showDeleteConfirmation = (categoria) => {
    setCategoriaToDelete(categoria);
    setShowConfirmModal(true);
  };

  return (
    <div style={{ margin: "2%" }}>
      <h3>Lista de Categorías</h3>
      {loading ? (
        <p>Cargando categorías...</p>
      ) : categorias.length === 0 ? (
        <p>No hay categorías cargadas</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.idCategoria}>
                <td>{categoria.idCategoria}</td>
                <td>{categoria.titulo}</td>
                <td>{categoria.descripcion}</td>
                <td>
                  <img
                    src={
                      privateUrl != ""
                        ? `${privateUrl}:80/categorias/${categoria.idCategoria}/categoria-image`
                        : `${publicUrl}:80/categorias/${categoria.idCategoria}/categoria-image`
                    }
                    alt={categoria.titulo}
                    style={{ maxWidth: "100px" }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => showDeleteConfirmation(categoria)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                  <Link to={`/categorias/${categoria.idCategoria}/actualizar`}>
                    <Button
                      variant="warning"
                      size="sm"
                      style={{ marginRight: "5px" }}
                    >
                      <EditIcon style={{ color: "#2b2b28" }} />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Seguro de que deseas eliminar la categoría{" "}
          {categoriaToDelete?.titulo}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => eliminarCategoria(categoriaToDelete?.idCategoria)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
