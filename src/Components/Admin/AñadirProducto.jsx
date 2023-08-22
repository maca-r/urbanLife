import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import styles from "./AñadirProducto.module.css";

export function AñadirProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [detalle, setDetalle] = useState("");
  const [color, setColor] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [talles, setTalles] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedTalle, setSelectedTalle] = useState("");
  const [opciones, setOpciones] = useState("");
  const [mensaje, setMensaje] = useState("");

  const check = ["TELA", "FINA", "TEXTURA", "GRUESA"];

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:80/categorias/listar");
      setCategorias(response.data);
    } catch (error) {
      console.error("Error fetching categorias:", error);
    }
  };

  const fetchTalles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:80/talles/listartalles"
      );
      setTalles(response.data);
    } catch (error) {
      console.error("Error fetching talles:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTalles();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const selectedCategory = categorias.find(
        (cat) => cat.nombreCategoria === selectedCategoria
      );

      const productoData = {
        nombre: nombre,
        precio: precio,
        detalle: detalle,
        color: color,
        categorias: {
          idCategoria: selectedCategory.idCategoria,
          nombreCategoria: selectedCategoria,
        },
      };

      const response = await axios.post(
        "http://localhost:80/productos/registrar",
        productoData
      );

      if (response.status === 200 || response.status === 202) {
        setMensaje("Producto agregado exitosamente");
        setNombre("");
        setPrecio("");
        setDetalle("");
        setColor("");
        setSelectedCategoria("");
        setSelectedTalle("");
        setOpciones("");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>Agregar Producto</h3>

      <Form onSubmit={handleSubmit} className={styles.customFont}>
        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            style={{ width: "50%" }}
            type="text"
            value={nombre}
            placeholder="Ingresar nombre del producto"
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            value={precio}
            placeholder="Ingrese el precio del producto"
            onChange={(e) => setPrecio(e.target.value)}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Detalle</Form.Label>
          <Form.Control
            as="textarea"
            value={detalle}
            placeholder="Ingrese el detalle del producto"
            onChange={(e) => setDetalle(e.target.value)}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            value={color}
            placeholder="Ingrese el color del producto"
            onChange={(e) => setColor(e.target.value)}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Checklist</Form.Label>
          {check.map((option, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={option}
              value={option}
              checked={opciones === option}
              onChange={() => setOpciones(option)}
            />
          ))}
        </Form.Group>

        {/* ------------------------------------------------------------------ */}

        <Form.Group>
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            id="categoria"
            value={selectedCategoria}
            onChange={(e) => {
              setSelectedCategoria(e.target.value);
              const selectedCategory = categorias.find(
                (cat) => cat.selectedId === e.target.value
              );
              setSelectedCategoria(selectedCategory.nombreCategoria);
            }}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.selectedId} value={categoria.selectedId}>
                {categoria.nombreCategoria}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* ------------------------------------------------------------------ */}

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Talle</Form.Label>

          <Form.Select
            value={selectedTalle}
            onChange={(e) => setSelectedTalle(e.target.value)}
          >
            {talles.map((talle) => (
              <option key={talle.idMedida} value={talle.talle}>
                {talle.talle}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* ------------------------------------------------------------------ */}

        <Button type="submit">Agregar Producto</Button>
      </Form>
      {mensaje && <Alert variant="success">{mensaje}</Alert>}{" "}
    </div>
  );
}

{
  /* <label>
          Imagen:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />
          
        </label> */
}

{
  /* <Form.Group style={{marginBottom:"2%"}}>
          <Form.Label>
            Imagen
          </Form.Label>
          
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </Form.Group> */
}
