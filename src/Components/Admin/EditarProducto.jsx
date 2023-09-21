import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Form } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function EditarProducto() {
  const { idProducto } = useParams();
  const [editedProduct, setEditedProduct] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [showWarning, setShowWarning] = useState(true);
  const [redirectToAdminPanel, setRedirectToAdminPanel] = useState(false);
  const storedToken = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  };

  const navigate = useNavigate(); // Declarar navigate antes de su uso

  useEffect(() => {
    fetchProductoPorId(idProducto);
  }, [idProducto]);

  if (redirectToAdminPanel) {
    navigate(-1);
    return null;
  }
  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const fetchProductoPorId = async (id) => {
    try {
      const urlProductoId =
        privateUrl !== ""
          ? `${privateUrl}:80/productos/obtener/${id}`
          : `${publicUrl}:80/productos/obtener/${id}`;

      const response = await axios.get(urlProductoId, axiosConfig);
      setEditedProduct(response.data);
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
    }
  };

  const handleEdit = async () => {
    try {
      if (!idProducto) {
        setStatusMessage("Error: ID del producto no está definido");
        return;
      }

      const urlEditarProducto =
        privateUrl !== ""
          ? `${privateUrl}:80/productos/editar/${idProducto}`
          : `${publicUrl}:80/productos/editar/${idProducto}`;

      const { nombre, detalle, color } = editedProduct;
      const precio = parseInt(editedProduct.precio);

      const response = await axios.put(
        urlEditarProducto,
        {
          nombre,
          precio,
          detalle,
          color,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.status === 200 || response.status === 202) {
        setStatusMessage("Cambios guardados exitosamente");
        setRedirectToAdminPanel(true);
      }
    } catch (error) {
      console.error("Error al editar el producto:", error);
      setStatusMessage("Error al guardar los cambios");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <div style={{ margin: "2%" }}>
      {showWarning && (
        <Alert variant="danger">
          ¡Esta sección está en proceso de actualización actualmente!
          <Button
            variant="secondary"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setShowWarning(false);
              setRedirectToAdminPanel(true);
            }}
          >
            Volver al Panel de Administrador
          </Button>
        </Alert>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2%",
        }}
      >
        <h3>Editar Producto</h3>
        <button
          style={{ border: "none", padding: "7px" }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
          Panel Admin{" "}
        </button>
      </div>
      <Form
        style={{
          width: "50%",
          marginLeft: "3%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={editedProduct.nombre || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Color:</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={editedProduct.color || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Detalle:</Form.Label>
          <Form.Control
            as="textarea"
            name="detalle"
            value={editedProduct.detalle || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Precio:</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={editedProduct.precio || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
      <Button
        style={{
          marginLeft: "3%",
          width: "15%",
          backgroundColor: "#E3B04B",
          border: "none",
          color: "#2B2B28",
        }}
        onClick={handleEdit}
      >
        Guardar Cambios
      </Button>
      {statusMessage && <Alert variant="success">{statusMessage}</Alert>}{" "}
    </div>
  );
}
