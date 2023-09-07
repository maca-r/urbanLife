import axios from "axios";
import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";

export function AddTalles() {
  const [talle, setTalle] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleAgregarTalle = async () => {
    try {
      if (talle === null || talle === "") {
        setMensaje("El valor del talle no es válido");
        return;
      }

      const talleData = {
        talle: talle,
      };

      const response = await axios.post(
        `http://localhost:80/talles/registrarTalle`,
        talleData
      );

      if (response.status === 200 || response.status === 202) {
        setMensaje("Talle agregado exitosamente");
        setTalle("");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMensaje("Hubo un error al agregar el talle");
    }
  };

  return (
    <div>
      <Form style={{ marginBottom: "2%", display:"flex",flexDirection: "column", alignItems: "stretch" }}>
        <h3>Registre un nuevo Talle</h3>
        {mensaje && <Alert variant="info">{mensaje}</Alert>}

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Talle nuevo</Form.Label>
          <Form.Control
            style={{ width: "30%" }}
            type="text"
            value={talle}
            onChange={(e) => setTalle(e.target.value)}
          />
        </Form.Group>
        <Button variant="secondary" style={{width:"25%"}} onClick={handleAgregarTalle}>Registrar</Button>
      </Form>
    </div>
  );
}
