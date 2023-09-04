import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export function ListarCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:80/categorias/listarcategorias-all")
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

  const eliminarCategoria = (id) => {
    axios
      .delete(`http://localhost:80/categorias/${id}/eliminar`)
      .then(() => {
        const updatedCategorias = categorias.filter(
          (categoria) => categoria.idCategoria !== id
        );
        setCategorias(updatedCategorias);
        setShowConfirmModal(false);
      })
      .catch((error) => {
        console.error(`Error al eliminar la categoría con ID ${id}:`, error);
      });
  };

  const showDeleteConfirmation = (categoria) => {
    setCategoriaToDelete(categoria);
    setShowConfirmModal(true);
  };

  return (
    <div>
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
                    src={`http://localhost:80/categorias/${categoria.idCategoria}/categoria-image`}
                    alt={categoria.titulo}
                  />
                </td>
                <td>
                  <button
                    onClick={() => showDeleteConfirmation(categoria)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
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
