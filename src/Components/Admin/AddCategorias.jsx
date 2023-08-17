import axios from "axios";
import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";

export function AddCategorias() {
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleAgregarCategoria = async () => {
    try {
      if (nombreCategoria === null || nombreCategoria === "") {
        setMensaje("El valor de la categoría no es válido");
        return;
      }

      const categoriaData = {
        nombreCategoria: nombreCategoria,
      };

      const response = await axios.post(
        "http://localhost:80/categorias/registrar",
        categoriaData
      );

      if (response.status === 200 || response.status === 202) {
        setMensaje("Categoría agregada exitosamente");
        setNombreCategoria("");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMensaje("Hubo un error al agregar la categoría");
    }
  };

  return (
    <div>
      <Form style={{ marginBottom: "2%" }}>
        <h3>Categoría</h3>
        {mensaje && <Alert variant="info">{mensaje}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Categoría nueva</Form.Label>
          <Form.Control
            style={{ width: "30%" }}
            type="text"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
          />
        </Form.Group>

        <Button onClick={handleAgregarCategoria}>Agregar Categoría</Button>
      </Form>
    </div>
  );
}
