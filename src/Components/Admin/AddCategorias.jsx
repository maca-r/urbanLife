import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export function AddCategorias() {
  const [nombreCategoria, setNombreCategoria] = useState("");

  const handleAgregarCategoria = async () => {
    try {
      if (nombreCategoria === null || nombreCategoria === "") {
        console.log("El valor de la categoria no es válido");
        return;
      }

      const categoriaData = {
        nombreCategoria: nombreCategoria,
      };

      const response = await axios.post(
        "http://localhost:80/categorias/registrar",
        categoriaData
      );

      if (response.status === 200) {
        console.log("Categoría agregada exitosamente");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <Form style={{ marginBottom: "2%" }}>
        <h3>Categoria</h3>
        <Form.Group className="mb-3">
          <Form.Label>Categoria nueva</Form.Label>
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
