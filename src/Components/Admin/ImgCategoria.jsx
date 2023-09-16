import { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";

export function ImgCategoria() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [categoriasNoEliminadas, setCategoriasNoEliminadas] = useState([]);

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const urlListarCategorias =
    privateUrl != ""
      ? `${privateUrl}:80/categorias/listarcategorias-all`
      : `${publicUrl}:80/categorias/listarcategorias-all`;

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:80/categorias/listarcategorias-all")
  //     .then((response) => {
  //       const categoriasFiltradas = response.data.filter(
  //         (categoria) => !categoria.eliminarCategoria
  //       );
  //       setCategoriasNoEliminadas(categoriasFiltradas);
  //     })
  //     .catch((error) => {
  //       console.error("Error al obtener las categorías:", error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(urlListarCategorias)
      .then((response) => {
        const categoriasFiltradas = response.data.filter(
          (categoria) => !categoria.eliminarCategoria
        );
        setCategoriasNoEliminadas(categoriasFiltradas);
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
      });
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const urlCategoriaImagen =
    privateUrl != ""
      ? `${privateUrl}:80/categorias/${selectedCategoria}/categoria-image`
      : `${publicUrl}:80/categorias/${selectedCategoria}/categoria-image`;

  // const handleUpload = async () => {
  //   if (!selectedFile || !selectedCategoria) {
  //     setUploadMessage(
  //       "Seleccione una imagen y una categoría antes de subirla."
  //     );
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append("file", selectedFile);

  //     const response = await axios.post(
  //       `http://localhost:80/categorias/${selectedCategoria}/categoria-image`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     if (response.status === 200 || response.status === 202) {
  //       setUploadMessage("Imagen cargada exitosamente.");
  //       setSelectedFile(null);
  //       setSelectedCategoria("");
  //     }
  //   } catch (error) {
  //     console.error("Error en la solicitud:", error);
  //     setUploadMessage("Hubo un error al cargar la imagen.");
  //   }
  // };

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

      const response = await axios.post(urlCategoriaImagen, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
    <div
      style={{
        margin: "2%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
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

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ backgroundColor: "#EFEEEE" }}
      />

      <select
        value={selectedCategoria}
        onChange={(e) => setSelectedCategoria(e.target.value)}
        style={{
          width: "30%",
          margin: "10px",
          border: "none",
          borderRadius: "5px",
          padding: "7px",
        }}
      >
        <option value="">Seleccione una categoría</option>
        {categoriasNoEliminadas.map((categoria) => (
          <option key={categoria.idCategoria} value={categoria.idCategoria}>
            {categoria.titulo}
          </option>
        ))}
      </select>

      <Button
        onClick={handleUpload}
        style={{
          width: "20%",
          margin: "10px",
          backgroundColor: "#E3B04B",
          border: "none",
          color: "#2B2B28",
        }}
      >
        Subir Imagen
      </Button>
    </div>
  );
}
