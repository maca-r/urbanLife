import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Form } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function EditarProducto() {
  const { idProducto } = useParams();
  const [editedProduct, setEditedProduct] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [productTalles, setProductTalles] = useState([]);

  const [selectedCategoria, setSelectedCategoria] = useState("");
  const storedToken = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  };

  const telas = ["ALGODÓN", "POLIÉSTER", "LINO", "CUERO", "SEDA"];
  const cortes = ["FIESTA", "CUMPLEAÑOS", "CASAMIENTO"];
  const generos = ["MASCULINO", "FEMENINO", "UNISEX"];
  const temporadas = ["OTOÑO", "INVIERNO", "PRIMAVERA", "VERANO"];
  const talles = ["S", "XL", "XXL", "M", "L"];

  useEffect(() => {
    fetchProductoPorId(idProducto);
    fetchCategories();
  }, [idProducto]);

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const urlListarCategorias =
    privateUrl != ""
      ? `${privateUrl}:80/categorias/listarcategorias-all`
      : `${publicUrl}:80/categorias/listarcategorias-all`;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(urlListarCategorias, axiosConfig);
      setCategorias(response.data);
    } catch (error) {
      console.error("Error fetching categorias:", error);
    }
  };

  const fetchProductoPorId = async (id) => {
    try {
      const urlProductoId =
        privateUrl !== ""
          ? `${privateUrl}:80/productos/obtener/${id}`
          : `${publicUrl}:80/productos/obtener/${id}`;

      const response = await axios.get(urlProductoId, axiosConfig);
      setEditedProduct(response.data);
      setSelectedCategoria(response.data.categorias.idCategoria);
      setProductTalles(response.data.talles);
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
    }
  };

  const handleEdit = async () => {
    try {
      const selectedCategoryId = parseInt(selectedCategoria);
      const selectedCategory = categorias.find(
        (cat) => cat.idCategoria === selectedCategoryId
      );

      if (!selectedCategory) {
        setStatusMessage("Error: Categoría no encontrada");
        return;
      }

      if (!idProducto) {
        setStatusMessage("Error: ID del producto no está definido");
        return;
      }

      const urlEditarProducto =
        privateUrl !== ""
          ? `${privateUrl}:80/productos/editar/${idProducto}`
          : `${publicUrl}:80/productos/editar/${idProducto}`;

      const response = await axios.put(
        urlEditarProducto,
        {
          ...editedProduct,
          categorias: {
            idCategoria: selectedCategory.idCategoria,
            titulo: selectedCategory.titulo,
          },
          talles: productTalles,
        },
        axiosConfig
      );

      if (response.status === 200 || response.status === 202) {
        setStatusMessage("Cambios guardados exitosamente");
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

  const handleTallesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setProductTalles([...productTalles, value]);
    } else {
      setProductTalles(productTalles.filter((talle) => talle !== value));
    }
  };

  const navigate = useNavigate();

  return (
    <div style={{ margin: "2%" }}>
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

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Corte:</Form.Label>
          <Form.Select
            name="evento"
            value={editedProduct.evento || ""}
            onChange={handleInputChange}
          >
            {cortes.map((corte) => (
              <option key={corte} value={corte}>
                {corte}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Género:</Form.Label>
          <Form.Select
            name="genero"
            value={editedProduct.genero || ""}
            onChange={handleInputChange}
          >
            {generos.map((genero) => (
              <option key={genero} value={genero}>
                {genero}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Tela:</Form.Label>
          <Form.Select
            name="tela"
            value={editedProduct.tela || ""}
            onChange={handleInputChange}
          >
            {telas.map((tela) => (
              <option key={tela} value={tela}>
                {tela}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Temporada:</Form.Label>
          <Form.Select
            name="temporada"
            value={editedProduct.temporada || ""}
            onChange={handleInputChange}
          >
            {temporadas.map((temporada) => (
              <option key={temporada} value={temporada}>
                {temporada}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            id="categoria"
            value={selectedCategoria}
            onChange={(e) => {
              setSelectedCategoria(e.target.value);
            }}
          >
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.titulo}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Talles:</Form.Label>
          <Form.Check
            type="checkbox"
            label="S"
            name="talles"
            value="S"
            checked={productTalles.includes("S")}
            onChange={handleTallesChange}
          />
          <Form.Check
            type="checkbox"
            label="M"
            name="talles"
            value="M"
            checked={productTalles.includes("M")}
            onChange={handleTallesChange}
          />
          <Form.Check
            type="checkbox"
            label="L"
            name="talles"
            value="L"
            checked={productTalles.includes("L")}
            onChange={handleTallesChange}
          />
          <Form.Check
            type="checkbox"
            label="XL"
            name="talles"
            value="XL"
            checked={productTalles.includes("XL")}
            onChange={handleTallesChange}
          />
          <Form.Check
            type="checkbox"
            label="XXL"
            name="talles"
            value="XXL"
            checked={productTalles.includes("XXL")}
            onChange={handleTallesChange}
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
