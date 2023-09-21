import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import styles from "./AñadirProducto.module.css";

export function AñadirProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [detalle, setDetalle] = useState("");
  const [color, setColor] = useState("");

  const [tallesSeleccionados, setTallesSeleccionados] = useState([]);
  const [talles, setTalles] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");

  const [mensaje, setMensaje] = useState("");

  const storedToken = localStorage.getItem("token");

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const urlListarCategorias =
    privateUrl != ""
      ? `${privateUrl}:80/categorias/listarcategorias-all`
      : `${publicUrl}:80/categorias/listarcategorias-all`;

  const fetchCategories = async () => {
    try {
      axios.get(urlListarCategorias).then((response) => {
        const categoriasNoEliminadas = response.data.filter(
          (categoria) => categoria.eliminarCategoria === false
        );
        setCategorias(categoriasNoEliminadas);
      });
    } catch (error) {
      console.error("Error fetching categorias:", error);
    }
  };

  const getCategorias =
    privateUrl != ""
      ? `${privateUrl}:80/categorias/listarcategorias-all`
      : `${publicUrl}:80/categorias/listarcategorias-all`;

  const getTalles =
    privateUrl != ""
      ? `${privateUrl}:80/talles/listartalles-all`
      : `${publicUrl}:80/talles/listartalles-all`;

  useEffect(() => {
    axios
      .get(getCategorias, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });

    axios
      .get(getTalles, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setTalles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener talles:", error);
      });
    fetchCategories();
  }, []);

  const handleTalleChange = (event) => {
    const talleId = event.target.value;
    if (tallesSeleccionados.includes(talleId)) {
      // Si el talle ya está seleccionado, quitarlo
      setTallesSeleccionados(
        tallesSeleccionados.filter((id) => id !== talleId)
      );
    } else {
      // Si el talle no está seleccionado, agregarlo
      setTallesSeleccionados([...tallesSeleccionados, talleId]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const selectedCategory = categorias.find(
        (cat) => cat.titulo === selectedCategoria
      );

      // Obtener los objetos de talles seleccionados
      const selectedTalles = talles.filter((talle) =>
        tallesSeleccionados.includes(talle.idMedida.toString())
      );

      const productoData = {
        nombre: nombre,
        precio: parseFloat(precio),
        detalle: detalle,
        color: color,
        categorias: {
          idCategoria: selectedCategory.idCategoria,
          titulo: selectedCategory.titulo,
          descripcion: selectedCategory.descripcion,
          eliminarCategoria: selectedCategory.eliminarCategoria,
        },
        talles: selectedTalles,
      };

      const urlRegistrarProductos =
        privateUrl !== ""
          ? `${privateUrl}:80/productos/registrar`
          : `${publicUrl}:80/productos/registrar`;

      const response = await axios.post(urlRegistrarProductos, productoData);

      if (response.status === 200 || response.status === 202) {
        setMensaje("Producto agregado exitosamente");
        setNombre("");
        setPrecio("");
        setDetalle("");
        setColor("");
        setSelectedCategoria("");
        setTallesSeleccionados([]);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>Agregar Producto</h3>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            style={{ width: "50%" }}
            type="text"
            value={nombre}
            placeholder="Ingrese nombre del producto"
            onChange={(e) => setNombre(e.target.value.toLowerCase())}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Precio</Form.Label>
          <Form.Control
            style={{ width: "35%" }}
            type="number"
            value={precio}
            placeholder="Ingrese el precio del producto"
            onChange={(e) => setPrecio(e.target.value.toLowerCase())}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Detalle</Form.Label>
          <Form.Control
            style={{ width: "50%" }}
            as="textarea"
            value={detalle}
            placeholder="Ingrese el detalle del producto"
            onChange={(e) => setDetalle(e.target.value.toLowerCase())}
          />
        </Form.Group>

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Color</Form.Label>
          <Form.Control
            style={{ width: "35%" }}
            type="text"
            value={color}
            placeholder="Ingrese el color del producto"
            onChange={(e) => setColor(e.target.value.toLowerCase())}
          />
        </Form.Group>

        {/* ------------------------------------------------------------------ */}

        <Form.Group style={{ marginBottom: "2%" }}>
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            style={{ width: "35%" }}
            id="categoria"
            value={selectedCategoria}
            onChange={(e) => {
              setSelectedCategoria(e.target.value);
            }}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.selectedId} value={categoria.selectedId}>
                {categoria.titulo}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* ------------------------------------------------------------------ */}

        <div>
          <label>Talles:</label>
          {talles.map((talle) => (
            <div key={talle.idMedida}>
              <label>
                <input
                  type="checkbox"
                  name="tallesSeleccionados"
                  value={talle.idMedida}
                  onChange={handleTalleChange}
                  checked={tallesSeleccionados.includes(talle.idMedida)}
                />

                {talle.talle}
              </label>
            </div>
          ))}
        </div>

        {/* ---------------------------------------------------------------------- */}

        <Button
          type="submit"
          style={{
            width: "25%",
            backgroundColor: "#E3B04B",
            border: "none",
            color: "#2B2B28",
          }}
        >
          Agregar Producto
        </Button>
      </Form>
      {mensaje && <Alert variant="success">{mensaje}</Alert>}{" "}
    </div>
  );
}

// import { useState, useEffect } from "react";
// import axios from "axios";

// export function AñadirProducto() {
//   const [producto, setProducto] = useState({
//     nombre: "",
//     precio: 0,
//     detalle: "",
//     color: "",
//     categorias: {
//       idCategoria: 1,
//       titulo: "",
//       descripcion: "",
//     },
//     talles: [],
//   });

// const [categorias, setCategorias] = useState([]);
// const [token, setToken] = useState("");
// const [tallesSeleccionados, setTallesSeleccionados] = useState([]);
// const [talles, setTalles] = useState([]);
// const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
// const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

// const storedToken = localStorage.getItem("token");

// useEffect(() => {
//   if (storedToken) {
//     setToken(storedToken);
//   }

//   const getCategorias =
//     privateUrl != ""
//       ? `${privateUrl}:80/categorias/listarcategorias-all`
//       : `${publicUrl}:80/categorias/listarcategorias-all`;

//   axios
//     .get(getCategorias, {
//       headers: {
//         Authorization: `Bearer ${storedToken}`,
//       },
//     })
//     .then((response) => {
//       setCategorias(response.data);
//     })
//     .catch((error) => {
//       console.error("Error al obtener categorías:", error);
//     });

//   const getTalles =
//     privateUrl != ""
//       ? `${privateUrl}:80/talles/listartalles-all`
//       : `${publicUrl}:80/talles/listartalles-all`;

//   axios
//     .get(getTalles, {
//       headers: {
//         Authorization: `Bearer ${storedToken}`,
//       },
//     })
//     .then((response) => {
//       setTalles(response.data);
//     })
//     .catch((error) => {
//       console.error("Error al obtener talles:", error);
//     });
// }, []);

// const handleTalleChange = (e) => {
//   const talleId = e.target.value;
//   if (tallesSeleccionados.includes(talleId)) {
//     setTallesSeleccionados((prevTalles) =>
//       prevTalles.filter((id) => id !== talleId)
//     );
//     setProducto((prevProducto) => ({
//       ...prevProducto,
//       talles: prevProducto.talles.filter(
//         (talle) => talle.idMedida !== parseInt(talleId, 10)
//       ),
//     }));
//   } else {
//     setTallesSeleccionados((prevTalles) => [...prevTalles, talleId]);
//     const selectedTalle = talles.find(
//       (talle) => talle.idMedida === parseInt(talleId, 10)
//     );
//     setProducto((prevProducto) => ({
//       ...prevProducto,
//       talles: [...prevProducto.talles, selectedTalle],
//     }));
//   }
// };

// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setProducto({
//     ...producto,
//     [name]: value,
//   });
// };

// const handleCategoriaChange = (e) => {
//   const selectedCategoriaId = e.target.value;
//   const selectedCategoria = categorias.find(
//     (categoria) => categoria.idCategoria === selectedCategoriaId
//   );

//   if (selectedCategoria) {
//     setProducto({
//       ...producto,
//       categorias: {
//         idCategoria: selectedCategoria.idCategoria,
//         titulo: selectedCategoria.titulo,
//         descripcion: selectedCategoria.descripcion,
//         urlimagen: selectedCategoria.urlimagen,
//       },
//     });
//   } else {
//     console.error("Categoría no encontrada para el ID seleccionado.");
//   }
// };

//   const regitroProducto =
//     privateUrl != ""
//       ? `${privateUrl}:80/productos/registrar`
//       : `${publicUrl}:80/productos/registrar`;

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post(regitroProducto, producto, {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//         },
//       })
//       .then((response) => {
//         console.log("Producto agregado exitosamente:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error al agregar el producto:", error);
//       });
//   };

//   return (
//     <div>
//       <h2>Agregar Producto</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="nombre">Nombre:</label>
//           <input
//             type="text"
//             id="nombre"
//             name="nombre"
//             value={producto.nombre}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="precio">Precio:</label>
//           <input
//             type="number"
//             id="precio"
//             name="precio"
//             value={producto.precio}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="detalle">Detalle:</label>
//           <input
//             type="text"
//             id="detalle"
//             name="detalle"
//             value={producto.detalle}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="color">Color:</label>
//           <input
//             type="text"
//             id="color"
//             name="color"
//             value={producto.color}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="categoria">Categoría:</label>
//           <select
//             id="categoria"
//             name="categoria"
//             onChange={handleCategoriaChange}
//             required
//           >
//             <option value="">Seleccionar Categoría</option>
//             {categorias.map((categoria) => (
//               <option key={categoria.idCategoria} value={categoria.idCategoria}>
//                 {categoria.titulo}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Talles:</label>
//           {talles.map((talle) => (
//             <div key={talle.idMedida}>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="tallesSeleccionados"
//                   value={talle.idMedida.toString()} // Convierte a cadena de texto
//                   onChange={handleTalleChange}
//                   checked={tallesSeleccionados.includes(
//                     talle.idMedida.toString()
//                   )}
//                 />
//                 {talle.talle}
//               </label>
//             </div>
//           ))}
//         </div>

//         <button type="submit">Agregar Producto</button>
//       </form>
//     </div>
//   );
// }
