// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { Alert, Button, Form } from "react-bootstrap";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// export function EditarProducto() {
//   const { idProducto } = useParams();
//   const [editedProduct, setEditedProduct] = useState({});
//   const [statusMessage, setStatusMessage] = useState("");
//   const [categorias, setCategorias] = useState([]);
//   const [productTalles, setProductTalles] = useState([]);
//   const [talles, setTalles] = useState([]);

//   const [selectedCategoria, setSelectedCategoria] = useState("");
//   const storedToken = localStorage.getItem("token");

//   const axiosConfig = {
//     headers: {
//       Authorization: `Bearer ${storedToken}`,
//     },
//   };

//   useEffect(() => {
//     fetchProductoPorId(idProducto);
//     fetchCategories();
//     fetchTalles();
//     fetchTallesDelProducto(idProducto); // Nueva función para obtener los talles del producto
//   }, [idProducto]);

//   const fetchTallesDelProducto = async (id) => {
//     try {
//       const urlTallesDelProducto =
//         privateUrl !== ""
//           ? `${privateUrl}:80/talles/listatalles-producto/${id}`
//           : `${publicUrl}:80/talles/listatalles-producto/${id}`;

//       const response = await axios.get(urlTallesDelProducto, axiosConfig);
//       const tallesDelProducto = response.data.map((talle) => talle.idMedida);
//       setProductTalles(tallesDelProducto);
//     } catch (error) {
//       console.error(`Error fetching talles del producto con ID ${id}:`, error);
//     }
//   };

//   const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
//   const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

//   const fetchTalles = async () => {
//     try {
//       const urlListarTalles =
//         privateUrl !== ""
//           ? `${privateUrl}:80/talles/listartalles-all`
//           : `${publicUrl}:80/talles/listartalles-all`;

//       const response = await axios.get(urlListarTalles, axiosConfig);
//       setTalles(response.data);
//     } catch (error) {
//       console.error("Error fetching talles:", error);
//     }
//   };

//   const urlListarCategorias =
//     privateUrl != ""
//       ? `${privateUrl}:80/categorias/listarcategorias-all`
//       : `${publicUrl}:80/categorias/listarcategorias-all`;

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(urlListarCategorias, axiosConfig);
//       setCategorias(response.data);
//     } catch (error) {
//       console.error("Error fetching categorias:", error);
//     }
//   };

//   const fetchProductoPorId = async (id) => {
//     try {
//       const urlProductoId =
//         privateUrl !== ""
//           ? `${privateUrl}:80/productos/obtener/${id}`
//           : `${publicUrl}:80/productos/obtener/${id}`;

//       const response = await axios.get(urlProductoId, axiosConfig);
//       setEditedProduct(response.data);
//       setSelectedCategoria(response.data.categorias.idCategoria);
//       setProductTalles(response.data.talles);
//     } catch (error) {
//       console.error(`Error al obtener el producto con ID ${id}:`, error);
//     }
//   };

//   const handleEdit = async () => {
//     try {
//       const selectedCategoryId = parseInt(selectedCategoria);
//       const selectedCategory = categorias.find(
//         (cat) => cat.idCategoria === selectedCategoryId
//       );

//       if (!selectedCategory) {
//         setStatusMessage("Error: Categoría no encontrada");
//         return;
//       }

//       if (!idProducto) {
//         setStatusMessage("Error: ID del producto no está definido");
//         return;
//       }

//       // Filtra los valores null del array de talles seleccionados
//       const tallesSeleccionados = productTalles.filter(
//         (talleId) => talleId !== null
//       );

//       const urlEditarProducto =
//         privateUrl !== ""
//           ? `${privateUrl}:80/productos/editar/${idProducto}`
//           : `${publicUrl}:80/productos/editar/${idProducto}`;

//       const response = await axios.put(
//         urlEditarProducto,
//         {
//           ...editedProduct,
//           categorias: {
//             idCategoria: selectedCategory.idCategoria,
//             titulo: selectedCategory.titulo,
//           },
//           talles: tallesSeleccionados, // Envía los talles seleccionados sin valores null
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${storedToken}`, // Agrega el token de autorización
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 202) {
//         setStatusMessage("Cambios guardados exitosamente");
//       }
//     } catch (error) {
//       console.error("Error al editar el producto:", error);
//       setStatusMessage("Error al guardar los cambios");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct({ ...editedProduct, [name]: value });
//   };

//   const handleTalleChange = (e, talleId) => {
//     const isChecked = e.target.checked;

//     if (isChecked) {
//       // Agregar el talle al producto solo si no es un número
//       if (isNaN(talleId)) {
//         setProductTalles((prevTalles) => [...prevTalles, talleId]);
//       }
//     } else {
//       // Quitar el talle del producto excluyendo los valores numéricos
//       setProductTalles((prevTalles) =>
//         prevTalles.filter((id) => id !== talleId && isNaN(id))
//       );
//     }
//   };

//   const navigate = useNavigate();

//   return (
//     <div style={{ margin: "2%" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           margin: "2%",
//         }}
//       >
//         <h3>Editar Producto</h3>
//         <button
//           style={{ border: "none", padding: "7px" }}
//           onClick={() => navigate(-1)}
//         >
//           <ArrowBackIcon />
//           Panel Admin{" "}
//         </button>
//       </div>
//       <Form
//         style={{
//           width: "50%",
//           marginLeft: "3%",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "stretch",
//         }}
//       >
//         <Form.Group style={{ marginBottom: "2%" }}>
//           <Form.Label>Nombre:</Form.Label>
//           <Form.Control
//             type="text"
//             name="nombre"
//             value={editedProduct.nombre || ""}
//             onChange={handleInputChange}
//           />
//         </Form.Group>

//         <Form.Group style={{ marginBottom: "2%" }}>
//           <Form.Label>Color:</Form.Label>
//           <Form.Control
//             type="text"
//             name="color"
//             value={editedProduct.color || ""}
//             onChange={handleInputChange}
//           />
//         </Form.Group>

//         <Form.Group style={{ marginBottom: "2%" }}>
//           <Form.Label>Detalle:</Form.Label>
//           <Form.Control
//             as="textarea"
//             name="detalle"
//             value={editedProduct.detalle || ""}
//             onChange={handleInputChange}
//           />
//         </Form.Group>

//         <Form.Group style={{ marginBottom: "2%" }}>
//           <Form.Label>Precio:</Form.Label>
//           <Form.Control
//             type="number"
//             name="precio"
//             value={editedProduct.precio || ""}
//             onChange={handleInputChange}
//           />
//         </Form.Group>

//         <Form.Group style={{ marginBottom: "2%" }}>
//           <Form.Label>Categoría</Form.Label>
//           <Form.Select
//             id="categoria"
//             value={selectedCategoria}
//             onChange={(e) => {
//               setSelectedCategoria(e.target.value);
//             }}
//           >
//             {categorias.map((categoria) => (
//               <option key={categoria.idCategoria} value={categoria.idCategoria}>
//                 {categoria.titulo}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>

//         <Form.Group style={{ marginBottom: "2%" }}>
//           <Form.Label>Talles:</Form.Label>
//           {talles.map((talle) => (
//             <div key={talle.idMedida}>
//               <label>
//                 <input
//                   type="checkbox"
//                   name={`talle_${talle.idMedida}`}
//                   value={talle.idMedida.toString()}
//                   checked={productTalles.includes(talle.idMedida)}
//                   onChange={(e) => handleTalleChange(e, talle.idMedida)}
//                 />
//                 {talle.talle}
//               </label>
//             </div>
//           ))}
//         </Form.Group>
//       </Form>
//       <Button
//         style={{
//           marginLeft: "3%",
//           width: "15%",
//           backgroundColor: "#E3B04B",
//           border: "none",
//           color: "#2B2B28",
//         }}
//         onClick={handleEdit}
//       >
//         Guardar Cambios
//       </Button>
//       {statusMessage && <Alert variant="success">{statusMessage}</Alert>}{" "}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Form } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function EditarProducto() {
  const { idProducto } = useParams();
  const [editedProduct, setEditedProduct] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const storedToken = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  };

  useEffect(() => {
    fetchProductoPorId(idProducto);
  }, [idProducto]);

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const fetchProductoPorId = async (id) => {
    try {
      const urlProductoId =
        privateUrl !== ""
          ? `${privateUrl}:80/productos/obtener/${id}`
          : `${publicUrl}:80/productos/obtener/${id}`;

      const response = await axios.get(urlProductoId, axiosConfig);
      setEditedProduct(response.data);
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
    }
  };

  const handleEdit = async () => {
    try {
      if (!idProducto) {
        setStatusMessage("Error: ID del producto no está definido");
        return;
      }

      const urlEditarProducto =
        privateUrl !== ""
          ? `${privateUrl}:80/productos/editar/${idProducto}`
          : `${publicUrl}:80/productos/editar/${idProducto}`;

      const { nombre, detalle, color } = editedProduct; // Extraer los campos necesarios
      const precio = parseInt(editedProduct.precio); // Convertir el precio a entero

      const response = await axios.put(
        urlEditarProducto,
        {
          nombre,
          precio,
          detalle,
          color,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${storedToken}`, // Agrega el token de autorización
        //   },
        // }
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

  const navigate = useNavigate();

  return (
    <div style={{ margin: "2%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2%",
        }}
      >
        <h3>Editar Producto</h3>
        <button
          style={{ border: "none", padding: "7px" }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
          Panel Admin{" "}
        </button>
      </div>
      <Form
        style={{
          width: "50%",
          marginLeft: "3%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={editedProduct.nombre || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Color:</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={editedProduct.color || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Detalle:</Form.Label>
          <Form.Control
            as="textarea"
            name="detalle"
            value={editedProduct.detalle || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Precio:</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={editedProduct.precio || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
      <Button
        style={{
          marginLeft: "3%",
          width: "15%",
          backgroundColor: "#E3B04B",
          border: "none",
          color: "#2B2B28",
        }}
        onClick={handleEdit}
      >
        Guardar Cambios
      </Button>
      {statusMessage && <Alert variant="success">{statusMessage}</Alert>}{" "}
    </div>
  );
}
