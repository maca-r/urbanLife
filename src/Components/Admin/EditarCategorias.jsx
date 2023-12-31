import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Form } from "react-bootstrap";

export function EditarCategorias() {
  const token = localStorage.getItem("token");

  const { idCategoria } = useParams();
  const [editedCategoria, setEditedCategoria] = useState({
    titulo: "",
    descripcion: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const urlCategoriaId =
    privateUrl != ""
      ? `${privateUrl}:80/categorias/${idCategoria}`
      : `${publicUrl}:80/categorias/${idCategoria}`;

  useEffect(() => {
    fetchCategoriaPorId();
  }, []);

  const fetchCategoriaPorId = async () => {
    try {
      const response = await axios.get(urlCategoriaId);
      setEditedCategoria(response.data);
    } catch (error) {
      console.error(
        `Error al obtener la categoría con ID ${idCategoria}:`,
        error
      );
    }
  };

  const urlActualizarCategoria =
    privateUrl != ""
      ? `${privateUrl}:80/categorias/${idCategoria}/actualizar`
      : `${publicUrl}:80/categorias/${idCategoria}/actualizar`;

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        urlActualizarCategoria,
        editedCategoria,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 202) {
        setStatusMessage("Cambios guardados exitosamente");
      }
    } catch (error) {
      console.error("Error al editar la categoría:", error);
      setStatusMessage("Error al guardar los cambios");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategoria({
      ...editedCategoria,
      [name]: value,
    });
  };

  return (
    <div>
      <h3>Editar Categoría</h3>
      <Form style={{ width: "50%", marginLeft: "3%" }}>
        <Form.Group>
          <Form.Label>Título:</Form.Label>
          <Form.Control
            type="text"
            name="titulo"
            value={editedCategoria.titulo}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            name="descripcion"
            value={editedCategoria.descripcion}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
      <Button style={{ margin: "3%" }} onClick={handleEdit}>
        Guardar Cambios
      </Button>
      {statusMessage && <Alert variant="success">{statusMessage}</Alert>}
    </div>
  );
}
