import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import styles from "./AñadirProducto.module.css";

export function AñadirProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [detalle, setDetalle] = useState("");
  const [color, setColor] = useState("");
  const [corte, setCorte] = useState("");
  const [tela, setTela] = useState("");
  const [genero, setGenero] = useState("");
  const [temporada, setTemporada] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");

  const [mensaje, setMensaje] = useState("");

  const [selectedTalles, setSelectedTalles] = useState([]);

  const telas = ["ALGODÓN", "POLIÉSTER", "LINO", "CUERO", "SEDA"];
  // const cortes = ["FIESTA", "CUMPLEAÑOS", "CASAMIENTO"];
  const cortes = ["SLIM-FIT", "RECTO", "TUBO", "NORMAL"];
  const talles = ["S", "XL", "XXL", "M", "L"];

  const generos = ["MASCULINO", "FEMENINO", "GENDERLESS"];
  const temporadas = ["OTOÑO", "INVIERNO", "PRIMAVERA", "VERANO"];

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const urlListarCategorias =
    privateUrl != ""
      ? `${privateUrl}:80/categorias/listarcategorias-all`
      : `${publicUrl}:80/categorias/listarcategorias-all`;

  // const fetchCategories = async () => {
  //   try {
  //     axios
  //       .get("http://localhost:80/categorias/listarcategorias-all")
  //       .then((response) => {
  //         const categoriasNoEliminadas = response.data.filter(
  //           (categoria) => categoria.eliminarCategoria === false
  //         );
  //         setCategorias(categoriasNoEliminadas);
  //       });
  //   } catch (error) {
  //     console.error("Error fetching categorias:", error);
  //   }
  // };
  const fetchCategories = async () => {
    try {
      axios.get(urlListarCategorias).then((response) => {
        const categoriasNoEliminadas = response.data.filter(
          (categoria) => categoria.eliminarCategoria === false
        );
        setCategorias(categoriasNoEliminadas);
      });
    } catch (error) {
      console.error("Error fetching categorias:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const selectedCategory = categorias.find(
        (cat) => cat.titulo === selectedCategoria
      );

      const productoData = {
        nombre: nombre,
        precio: precio,
        detalle: detalle,
        color: color,
        tela: tela,
        genero: genero,
        corte: corte,
        temporada: temporada,
        categorias: {
          idCategoria: selectedCategory.idCategoria,
          titulo: selectedCategoria,
        },
        talles: selectedTalles,
      };

      const urlRegistrarProductos =
        privateUrl != ""
          ? `${privateUrl}:80/productos/registrar`
          : `${publicUrl}:80/productos/registrar`;

      const response = await axios.post(urlRegistrarProductos, productoData);

      if (response.status === 200 || response.status === 202) {
        setMensaje("Producto agregado exitosamente");
        setNombre("");
        setPrecio("");
        setDetalle("");
        setColor("");
        setTela("");
        setTemporada("");
        setCorte("");
        setGenero("");
        setSelectedCategoria("");
        setSelectedTalles("");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>Agregar Producto</h3>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            style={{ width: "50%" }}
            type="text"
            value={nombre}
            placeholder="Ingrese nombre del producto"
            onChange={(e) => setNombre(e.target.value.toLowerCase())}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Precio</Form.Label>
          <Form.Control
            style={{ width: "35%" }}
            type="number"
            value={precio}
            placeholder="Ingrese el precio del producto"
            onChange={(e) => setPrecio(e.target.value.toLowerCase())}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Detalle</Form.Label>
          <Form.Control
            style={{ width: "50%" }}
            as="textarea"
            value={detalle}
            placeholder="Ingrese el detalle del producto"
            onChange={(e) => setDetalle(e.target.value.toLowerCase())}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Color</Form.Label>
          <Form.Control
            style={{ width: "35%" }}
            type="text"
            value={color}
            placeholder="Ingrese el color del producto"
            onChange={(e) => setColor(e.target.value.toLowerCase())}
          />
        </Form.Group>

        {/* -------------------------------------------------------------- */}

        <div className={styles.checks}>
          <Form.Group style={{ marginBottom: "2%" }}>
            <Form.Label>Telas:</Form.Label>
            {telas.map((option, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={option}
                value={option}
                checked={tela === option}
                onChange={() => setTela(option)}
              />
            ))}
          </Form.Group>

          <Form.Group style={{ marginBottom: "2%" }}>
            <Form.Label>Corte:</Form.Label>
            {cortes.map((option, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={option}
                value={option}
                checked={corte === option}
                onChange={() => setCorte(option)}
              />
            ))}
          </Form.Group>

          <Form.Group style={{ marginBottom: "2%" }}>
            <Form.Label>Generos:</Form.Label>
            {generos.map((option, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={option}
                value={option}
                checked={genero === option}
                onChange={() => setGenero(option)}
              />
            ))}
          </Form.Group>

          <Form.Group style={{ marginBottom: "2%" }}>
            <Form.Label>Temporadas:</Form.Label>
            {temporadas.map((option, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={option}
                value={option}
                checked={temporada === option}
                onChange={() => setTemporada(option)}
              />
            ))}
          </Form.Group>
        </div>

        {/* ------------------------------------------------------------------ */}

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            style={{ width: "35%" }}
            id="categoria"
            value={selectedCategoria}
            onChange={(e) => {
              setSelectedCategoria(e.target.value);
            }}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.selectedId} value={categoria.selectedId}>
                {categoria.titulo}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* ------------------------------------------------------------------ */}

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Talles:</Form.Label>
          {talles.map((option, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={option}
              value={option}
              checked={selectedTalles.includes(option)}
            />
          ))}
        </Form.Group>

        {/* ---------------------------------------------------------------------- */}

        <Button
          type="submit"
          style={{
            width: "25%",
            backgroundColor: "#E3B04B",
            border: "none",
            color: "#2B2B28",
          }}
        >
          Agregar Producto
        </Button>
      </Form>
      {mensaje && <Alert variant="success">{mensaje}</Alert>}{" "}
    </div>
  );
}
