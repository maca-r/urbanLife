import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";

export function EditarProducto() {
  const { idProducto } = useParams();
  const [editedProduct, setEditedProduct] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");

  const telas = ["ALGODÓN", "POLIÉSTER", "LINO", "CUERO", "SEDA"];
  const eventos = ["A", "B", "C", "D"];
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
      <form>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={editedProduct.nombre || ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={editedProduct.color || ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Detalle:</label>
          <textarea
            name="detalle"
            value={editedProduct.detalle || ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={editedProduct.precio || ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Evento:</label>
          <select
            name="evento"
            value={editedProduct.evento || ""}
            onChange={handleInputChange}
          >
            {eventos.map((evento) => (
              <option key={evento} value={evento}>
                {evento}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Género:</label>
          <select
            name="genero"
            value={editedProduct.genero || ""}
            onChange={handleInputChange}
          >
            {generos.map((genero) => (
              <option key={genero} value={genero}>
                {genero}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Tela:</label>
          <select
            name="tela"
            value={editedProduct.tela || ""}
            onChange={handleInputChange}
          >
            {telas.map((tela) => (
              <option key={tela} value={tela}>
                {tela}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Temporada:</label>
          <select
            name="temporada"
            value={editedProduct.temporada || ""}
            onChange={handleInputChange}
          >
            {temporadas.map((temporada) => (
              <option key={temporada} value={temporada}>
                {temporada}
              </option>
            ))}
          </select>
        </div>

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
      </form>
      <button onClick={handleEdit}>Guardar Cambios</button>
      <p>{statusMessage}</p>
    </div>
  );
}
