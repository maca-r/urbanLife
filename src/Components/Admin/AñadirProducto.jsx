import axios from "axios";
import { useEffect, useState } from "react";

export function AñadirProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [detalle, setDetalle] = useState("");
  const [color, setColor] = useState("");
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [talles, setTalles] = useState([]);
  const [talle, setTalle] = useState("");

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
    <div>
      <section>
        <h2>Categoria</h2>
        <input
          type="text"
          value={nombreCategoria}
          onChange={(e) => setNombreCategoria(e.target.value)}
        />
        <button onClick={handleAgregarCategoria}>Agregar Categoría</button>
      </section>

      <section>
        <h2>Talles</h2>
        <input
          type="text"
          value={talle}
          onChange={(e) => setTalle(e.target.value)}
        />
        <button onClick={handleAgregarTalle}>Agregar Talle</button>
      </section>

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
          Categoría:
          <select
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
          >
            <option value="">categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nombreCategoria}>
                {categoria.nombreCategoria}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />
        <label>
          Talle:
          <select value={talle} onChange={(e) => setTalle(e.target.value)}>
            <option value="">talle</option>
            {talles.map((talle) => (
              <option key={talle.idMedida} value={talle.talle}>
                {talle.talle}
              </option>
            ))}
          </select>
        </label>
        <br />

        {/* <label>
          Imagen:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </label> */}
        <br />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}
