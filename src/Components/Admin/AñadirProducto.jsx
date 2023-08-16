import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./AñadirProducto.module.css";

export function AñadirProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [detalle, setDetalle] = useState("");
  const [color, setColor] = useState("");
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [talles, setTalles] = useState([]);
  const [talle, setTalle] = useState("");
  const [opciones, setOpciones] = useState("");

  const check = ["TELA", "FINA", "TEXTURA", "GRUESA"];

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:80/categorias/listar");
      setCategorias(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTalles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:80/talles/listartalles"
      );
      setTalles(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching talles:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTalles();
  }, []);

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
    window.location.reload();
  };

  const handleAgregarTalle = async () => {
    try {
      if (talle === null || talle === "") {
        console.log("El valor del talle no es válido");
        return;
      }

      const talleData = {
        talle: talle,
      };

      const response = await axios.post(
        "http://localhost:80/talles/registrarTalle",
        talleData
      );

      if (response.status === 200) {
        console.log("Talle agregado exitosamente");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const productoData = {
        nombre: nombre,
        precio: precio,
        detalle: detalle,
        color: color,
        categorias: {
          nombreCategoria: nombreCategoria,
        },
      };

      const response = await axios.post(
        "http://localhost:80/productos/registrar",
        productoData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Producto agregado exitosamente");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
    window.location.reload();
  };

  return (
    <div className={styles.formContainer}>

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

      <h3>Talles</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Talle nuevo</Form.Label>

          <Form.Control
            style={{ width: "30%" }}
            type="text"
            value={talle}
            onChange={(e) => setTalle(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleAgregarTalle}>Agregar Talle</Button>
      </Form>

      <h3>Agregar Producto</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            style={{ width: "50%" }}
            type="text"
            value={nombre}
            placeholder="Ingresar nombre del producto"
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            value={precio}
            placeholder="Ingrese el precio del producto"
            onChange={(e) => setPrecio(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 ">
          <Form.Label>Detalle</Form.Label>
          <Form.Control
            as="textarea"
            value={detalle}
            placeholder="Ingrese el detalle del producto"
            onChange={(e) => setDetalle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            value={color}
            placeholder="Ingrese el color del producto"
            onChange={(e) => setColor(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>

          <Form.Select
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
          >
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nombreCategoria}>
                {categoria.nombreCategoria}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Talle</Form.Label>

          <Form.Select value={talle} onChange={(e) => setTalle(e.target.value)}>
            {talles.map((talle) => (
              <option key={talle.idMedida} value={talle.talle}>
                {talle.talle}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* <label>
          Imagen:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />
          
        </label> */}

        {/* <Form.Group style={{marginBottom:"2%"}}>
          <Form.Label>
            Imagen
          </Form.Label>
          
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </Form.Group> */}
        <Button type="submit">Agregar Producto</Button>
      </Form>
    </div>
  );
}
