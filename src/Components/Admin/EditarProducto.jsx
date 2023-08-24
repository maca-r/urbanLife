import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Form } from "react-bootstrap";

export function EditarProducto() {
  const { idProducto } = useParams();
  const [editedProduct, setEditedProduct] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");

  const telas = ["ALGODÓN", "POLIÉSTER", "LINO", "CUERO", "SEDA"];
  const eventos = ["FIESTA", "CUMPLEAÑOS", "CASAMIENTO"];
  const generos = ["MASCULINO", "FEMENINO", "UNISEX"];
  const temporadas = ["OTOÑO", "INVIERNO", "PRIMAVERA", "VERANO"];

  useEffect(() => {
    fetchProductoPorId(idProducto);
    fetchCategories();
  }, [idProducto]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:80/categorias/listarcategorias-all"
      );
      setCategorias(response.data);
    } catch (error) {
      console.error("Error fetching categorias:", error);
    }
  };

  const fetchProductoPorId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:80/productos/${id}`);
      setEditedProduct(response.data);
      setSelectedCategoria(response.data.categorias.idCategoria);
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

      const response = await axios.put(
        `http://localhost:80/productos/editar/${idProducto}`,
        {
          ...editedProduct,
          categorias: {
            idCategoria: selectedCategory.idCategoria,
            nombreCategoria: selectedCategory.nombreCategoria,
          },
        }
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

  return (
    <div>
      <h3>Editar Producto</h3>
      <Form style={{ width: "50%", marginLeft: "3%" }}>
        <Form.Group>
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={editedProduct.nombre || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Color:</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={editedProduct.color || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Detalle:</Form.Label>
          <Form.Control
            as="textarea"
            name="detalle"
            value={editedProduct.detalle || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Precio:</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={editedProduct.precio || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Evento:</Form.Label>
          <Form.Select
            name="evento"
            value={editedProduct.evento || ""}
            onChange={handleInputChange}
          >
            {eventos.map((evento) => (
              <option key={evento} value={evento}>
                {evento}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
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

        <Form.Group>
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

        <Form.Group>
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

        <Form.Group>
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
                {categoria.nombreCategoria}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      <Button style={{ margin: "3%" }} onClick={handleEdit}>
        Guardar Cambios
      </Button>
      {statusMessage && <Alert variant="success">{statusMessage}</Alert>}{" "}
    </div>
  );
}
