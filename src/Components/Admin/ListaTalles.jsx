import { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
const ListaTalles = () => {
  const [talles, setTalles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError(
        "No se encontró el token de autenticación. Por favor, inicia sesión como administrador."
      );
      setIsLoading(false);
      return;
    }

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const listaTalles =
      privateUrl != ""
        ? `${privateUrl}:80/talles/listartalles-all`
        : `${publicUrl}:80/talles/listartalles-all`;

    axios
      .get(listaTalles, axiosConfig)
      .then((response) => {
        setTalles(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error al obtener la lista de talles.");
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Talles</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {!error && (
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Tipo de Talle
              </th>
            </tr>
          </thead>
          <tbody>
            {talles.map((talle) => (
              <tr key={talle.idMedida}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {talle.idMedida}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {talle.talle}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaTalles;
