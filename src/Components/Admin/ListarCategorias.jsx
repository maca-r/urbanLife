import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export function ListarCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState(null);


  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE
  

  const urlListarCategorias = 
    privateUrl != "" ? 
    `${privateUrl}:80/categorias/listarcategorias-all` :
    `${publicUrl}:80/categorias/listarcategorias-all`;

  // useEffect(() => {
  //   axios
  //     .get("http://10.0.1.104/categorias/listarcategorias-all")
  //     .then((response) => {
  //       const categoriasNoEliminadas = response.data.filter(
  //         (categoria) => categoria.eliminarCategoria === false
  //       );
  //       setCategorias(categoriasNoEliminadas);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error al obtener las categorías:", error);
  //       setLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://34.229.181.144/categorias/listarcategorias-all")
  //     .then((response) => {
  //       const categoriasNoEliminadas = response.data.filter(
  //         (categoria) => categoria.eliminarCategoria === false
  //       );
  //       setCategorias(categoriasNoEliminadas);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error al obtener las categorías:", error);
  //       setLoading(false);
  //     });
  // }, []);

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

  const params = useParams()

  const urlEliminarCategoria = privateUrl != "" ? 
  `${privateUrl}:80/categorias/${params.id}/eliminar` :
  `${publicUrl}:80/categorias/${params.id}/eliminar`;

  // const eliminarCategoria = (id) => {
  //   axios
  //     .delete(`http://localhost:80/categorias/${id}/eliminar`)
  //     .then(() => {
  //       const updatedCategorias = categorias.filter(
  //         (categoria) => categoria.idCategoria !== id
  //       );
  //       setCategorias(updatedCategorias);
  //       setShowConfirmModal(false);
  //     })
  //     .catch((error) => {
  //       console.error(`Error al eliminar la categoría con ID ${id}:`, error);
  //     });
  // };

  // const eliminarCategoria = () => {
  //   axios
  //     .delete(`http://34.229.181.144/categorias/${id}/eliminar`)
  //     .then(() => {
  //       const updatedCategorias = categorias.filter(
  //         (categoria) => categoria.idCategoria !== params.id
  //       );
  //       setCategorias(updatedCategorias);
  //       setShowConfirmModal(false);
  //     })
  //     .catch((error) => {
  //       console.error(`Error al eliminar la categoría con ID ${params.id}:`, error);
  //     });
  // };

  const eliminarCategoria = () => {
    axios
      .delete(urlEliminarCategoria)
      .then(() => {
        const updatedCategorias = categorias.filter(
          (categoria) => categoria.idCategoria !== params.id
        );
        setCategorias(updatedCategorias);
        setShowConfirmModal(false);
      })
      .catch((error) => {
        console.error(`Error al eliminar la categoría con ID ${params.id}:`, error);
      });
  };

  const showDeleteConfirmation = (categoria) => {
    setCategoriaToDelete(categoria);
    setShowConfirmModal(true);
  };

  const imagenCategoria =  privateUrl != "" ? 
  `${privateUrl}:80/categorias/${params.id}/categoria-image` :
  `${publicUrl}:80/categorias/${params.id}/categoria-image`



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
                  {/* <img
                    src={`http://34.229.181.144/categorias/${categoria.idCategoria}/categoria-image`}
                    alt={categoria.titulo}
                    style={{ maxWidth: "100px" }}
                  /> */}
                  <img
                    src={imagenCategoria}
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
