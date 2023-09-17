import { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";

export function AddImages() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const urlListaProductos =
    privateUrl != ""
      ? `${privateUrl}:80/productos/listaproductos-all`
      : `${publicUrl}:80/productos/listaproductos-all`;

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:80/productos/listaproductos-all")
  //     .then((response) => {
  //       setProducts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error al obtener los productos:", error);
  //     });
  // }, []);
  useEffect(() => {
    axios
      .get(urlListaProductos)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const newSelectedFiles = [...selectedFiles, ...files];
    setSelectedFiles(newSelectedFiles);

    const newPreviewImages = newSelectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages(newPreviewImages);
  };

  const urlSelectedProduct =
    privateUrl != ""
      ? `${privateUrl}:80/productos/${selectedProduct}/producto-image`
      : `${publicUrl}:80/productos/${selectedProduct}/producto-image`;

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !selectedProduct) {
      setUploadMessage(
        "Seleccione al menos una imagen y un producto antes de subirlas."
      );
      return;
    }

    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);

        // const imageResponse = await axios.post(
        //   `http://localhost:80/productos/${selectedProduct}/producto-image`,
        //   formData,
        //   {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   }
        // );

        const imageResponse = await axios.post(urlSelectedProduct, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (imageResponse.status === 200 || imageResponse.status === 202) {
          setUploadMessage("Imágenes cargadas exitosamente.");
          setSelectedFiles([]);
          setPreviewImages([]);
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setUploadMessage("Hubo un error al cargar las imágenes.");
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
      <h3>Añadir Imágenes a Producto</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        multiple
        style={{ backgroundColor: "#EFEEEE" }}
      />

      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "space-between",
          margin: "1%",
        }}
      >
        {previewImages.map((image, index) => (
          <div key={index} style={{ borderRadius: "3px" }}>
            <img
              src={image}
              alt={`Previsualización de la imagen ${index + 1}`}
              style={{
                maxWidth: "100px",
                borderRadius: "3px",
                boxShadow: "1px 9px 17px -7px rgba(43,43,40,0.61)",
              }}
            />
          </div>
        ))}
      </div>

      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        style={{
          width: "30%",
          margin: "10px",
          border: "none",
          borderRadius: "5px",
          padding: "7px",
        }}
      >
        <option value="">Seleccione un producto</option>
        {products.map((product) => (
          <option key={product.idProducto} value={product.idProducto}>
            {product.nombre}
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
        Subir Imágenes
      </Button>

      {uploadMessage && (
        <Alert
          variant={
            uploadMessage.includes("exitosamente") ? "success" : "danger"
          }
        >
          {uploadMessage}
        </Alert>
      )}
    </div>
  );
}
