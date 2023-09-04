import { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

export function ImgCategoria() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");

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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedCategoria) {
      setUploadMessage(
        "Seleccione una imagen y una categoría antes de subirla."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        `http://localhost:80/categorias/${selectedCategoria}/categoria-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 202) {
        setUploadMessage("Imagen cargada exitosamente.");
        setSelectedFile(null);
        setSelectedCategoria("");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setUploadMessage("Hubo un error al cargar la imagen.");
    }
  };

  return (
    <div>
      <h3>Añadir / cambiar imagen</h3>
      {uploadMessage && (
        <Alert
          variant={
            uploadMessage.includes("exitosamente") ? "success" : "danger"
          }
        >
          {uploadMessage}
        </Alert>
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <select
        value={selectedCategoria}
        onChange={(e) => setSelectedCategoria(e.target.value)}
      >
        <option value="">Seleccione una categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.idCategoria} value={categoria.idCategoria}>
            {categoria.titulo}
          </option>
        ))}
      </select>

      <button onClick={handleUpload}>Subir Imagen</button>
    </div>
  );
}
