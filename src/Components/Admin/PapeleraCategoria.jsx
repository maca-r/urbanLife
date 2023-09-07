import axios from "axios";
import { useEffect, useState } from "react";

export function PapeleraCategoria() {
  const [categoriasEliminadas, setCategoriasEliminadas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:80/categorias/listarcategorias-all")
      .then((response) => {
        const categoriasEliminadas = response.data.filter(
          (categoria) => categoria.eliminarCategoria === true
        );
        setCategoriasEliminadas(categoriasEliminadas);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las categorías eliminadas:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section style={{margin: "2%"}}>
      <h3>Categorías Eliminadas</h3>
      {loading ? (
        <p>Cargando categorías eliminadas...</p>
      ) : categoriasEliminadas.length === 0 ? (
        <p>No hay categorías eliminadas</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {categoriasEliminadas.map((categoria) => (
              <tr key={categoria.idCategoria}>
                <td>{categoria.idCategoria}</td>
                <td>{categoria.titulo}</td>
                <td>{categoria.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
