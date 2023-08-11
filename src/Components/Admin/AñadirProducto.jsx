import axios from "axios";
import { useState } from "react";

export function AñadirProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [detalle, setDetalle] = useState("");
  const [color, setColor] = useState("");
  const [imagen, setImagen] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("detalle", detalle);
    formData.append("imagen", imagen);

    try {
      const response = await axios.post(
        "http://localhost/productos/registrar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.ok) {
        console.log("Producto agregado exitosamente");
      } else {
        console.error("Error al agregar el producto");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <br />
        <label>
          Precio:
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </label>
        <br />
        <label>
          Detalle:
          <textarea
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Color:
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Imagen:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </label>
        <br />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}
