import axios from "axios";
import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";

export function AddCategorias() {
  const storedToken = localStorage.getItem("token");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const urlRegistroCategorias =
    privateUrl != ""
      ? `${privateUrl}:80/categorias/registrar`
      : `${publicUrl}:80/categorias/registrar`;

  const handleAgregarCategoria = async () => {
    try {
      if (titulo === null || titulo === "") {
        setMensaje("El valor de la categoría no es válido");
        return;
      }

      const categoriaData = {
        titulo: titulo,
        descripcion: descripcion,
      };

      const response = await axios.post(urlRegistroCategorias, categoriaData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.status === 200 || response.status === 202) {
        setMensaje("Categoría agregada exitosamente");
        setTitulo("");
        setDescripcion("");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMensaje("Hubo un error al agregar la categoría");
    }
  };

  return (
    <>
      <Form
        style={{
          margin: "2%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <h3>Categoría</h3>
        {mensaje && (
          <Alert
            variant={mensaje.includes("exitosamente") ? "success" : "danger"}
          >
            {mensaje}
          </Alert>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Categoría nueva</Form.Label>
          <Form.Control
            style={{ width: "30%" }}
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%", width: "50%" }}>
          <Form.Label>Detalle</Form.Label>
          <Form.Control
            as="textarea"
            value={descripcion}
            placeholder="Ingrese el detalle del producto"
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>

        <Button
          onClick={handleAgregarCategoria}
          style={{
            width: "20%",
            backgroundColor: "#E3B04B",
            border: "none",
            color: "#2B2B28",
          }}
        >
          Agregar Categoría
        </Button>
      </Form>
    </>
  );
}
