import axios from "axios";
import { useEffect, useState } from "react";

export function ListarCategorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:80/categorias/listarcategorias-all")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
      });
  }, []);

  return (
    <div>
      <h3>Lista de Categorías</h3>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.idCategoria}>
            {categoria.titulo}
            {categoria.descripcion}
            <img
              src={`http://localhost:80/categorias/${categoria.idCategoria}/categoria-image`}
              alt={categoria.titulo}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
