import React, { useState, useEffect } from "react";
import axios from "axios";

const ListaTalles = () => {
  const [talles, setTalles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token de autenticación no encontrado.");
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
        setTalles(response.data); // Asigna los datos de la respuesta al estado 'talles'
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error al obtener la lista de talles.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Lista de Talles</h2>
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
    </div>
  );
};

export default ListaTalles;
