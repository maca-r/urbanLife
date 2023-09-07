import { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Form, Button } from "react-bootstrap";

export function RegistrarTalleProd() {
  const [productos, setProductos] = useState([]);
  const [talles, setTalles] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState("");
  const [selectedTalles, setSelectedTalles] = useState({});
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:80/productos/listaproductos-all")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de productos:", error);
      });

    axios
      .get("http://localhost:80/talles/listartalles-all")
      .then((response) => {
        setTalles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de talles:", error);
      });
  }, []);

  const handleGuardarRelacion = () => {
    const selectedTallesIds = Object.keys(selectedTalles).filter(
      (talleId) => selectedTalles[talleId]
    );

    if (!selectedProducto || selectedTallesIds.length === 0) {
      setMensaje("Seleccione un producto y al menos un talle.");
      return;
    }

    const url = `http://localhost:80/productos/${selectedProducto}/registrartalles`;

    const data = selectedTallesIds.map((talleId) => ({
      idMedida: talleId,
      idProducto: selectedProducto,
    }));

    axios
      .post(url, data)
      .then((response) => {
        setMensaje("Relación guardada exitosamente");
        setSelectedProducto("");
        setSelectedTalles({});
      })
      .catch((error) => {
        console.error("Error al guardar la relación:", error);
        setMensaje("Hubo un error al guardar la relación");
      });
  };

  return (
    <section style={{margin:"2%"}}>
      <h3>Registrar Talle/s a Producto/s</h3>

      <Form style={{display:"flex",flexDirection: "column", alignItems: "stretch"}}>
        <Form.Group controlId="selectProducto" style={{width:"30%"}}>
          <Form.Label>Seleccione un producto:</Form.Label>
          <Form.Control
            as="select"
            value={selectedProducto}
            onChange={(e) => setSelectedProducto(e.target.value)}
          >
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.idProducto} value={producto.idProducto}>
                {producto.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="selectTalles" style={{width:"30%"}}>
          <Form.Label>Seleccione un talle:</Form.Label>
          {talles.map((talle) => (
            <Form.Check
              key={talle.idMedida}
              type="checkbox"
              id={`talle-${talle.idMedida}`}
              label={talle.talle}
              checked={selectedTalles[talle.idMedida] || false}
              onChange={(e) =>
                setSelectedTalles({
                  ...selectedTalles,
                  [talle.idMedida]: e.target.checked,
                })
              }
            />
          ))}
        </Form.Group>

        <Button style={{width:"30%"}} variant="secondary" onClick={handleGuardarRelacion}>
          Guardar Relación
        </Button>
      </Form>

      {mensaje && (
        <Alert
          variant={mensaje.includes("exitosamente") ? "success" : "danger"}
        >
          {mensaje}
        </Alert>
      )}
    </section>
  );
}
