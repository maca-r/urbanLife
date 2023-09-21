// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Button, Form, Alert } from "react-bootstrap";
// import styles from "./AñadirProducto.module.css";

// export function AñadirProducto() {
//   const [nombre, setNombre] = useState("");
//   const [precio, setPrecio] = useState("");
//   const [detalle, setDetalle] = useState("");
//   const [color, setColor] = useState("");
//   const [corte, setCorte] = useState("");
//   const [tela, setTela] = useState("");
//   const [genero, setGenero] = useState("");
//   const [temporada, setTemporada] = useState("");

//   const [categorias, setCategorias] = useState([]);
//   const [selectedCategoria, setSelectedCategoria] = useState("");

//   const [mensaje, setMensaje] = useState("");
//   const [selectedTalles, setSelectedTalles] = useState([]);

//   const telas = ["ALGODÓN", "POLIÉSTER", "LINO", "CUERO", "SEDA"];
//   const cortes = ["SLIM-FIT", "RECTO", "TUBO", "NORMAL"];
//   const talles = ["S", "XL", "XXL", "M", "L"];
//   const generos = ["MASCULINO", "FEMENINO", "GENDERLESS"];
//   const temporadas = ["OTOÑO", "INVIERNO", "PRIMAVERA", "VERANO"];

//   const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
//   const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

//   const urlListarCategorias =
//     privateUrl != ""
//       ? `${privateUrl}:80/categorias/listarcategorias-all`
//       : `${publicUrl}:80/categorias/listarcategorias-all`;

//   const fetchCategories = async () => {
//     try {
//       axios.get(urlListarCategorias).then((response) => {
//         const categoriasNoEliminadas = response.data.filter(
//           (categoria) => categoria.eliminarCategoria === false
//         );
//         setCategorias(categoriasNoEliminadas);
//       });
//     } catch (error) {
//       console.error("Error fetching categorias:", error);
//     }
//   };

//   const handleTalleChange = (talle) => {
//     if (selectedTalles.some((item) => item.talle === talle)) {
//       setSelectedTalles((prevTalles) =>
//         prevTalles.filter((item) => item.talle !== talle)
//       );
//     } else {
//       setSelectedTalles((prevTalles) => [...prevTalles, { talle: talle }]);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const selectedCategory = categorias.find(
//         (cat) => cat.titulo === selectedCategoria
//       );

//       const productoData = {
//         nombre: nombre,
//         precio: parseFloat(precio),
//         detalle: detalle,
//         color: color,
//         categorias: {
//           idCategoria: selectedCategory.idCategoria,
//           titulo: selectedCategory.titulo,
//           descripcion: selectedCategory.descripcion,
//           eliminarCategoria: selectedCategory.eliminarCategoria,
//           urlimagen: selectedCategory.urlimagen,
//         },
//         talles: selectedTalles,
//       };

//       const urlRegistrarProductos =
//         privateUrl != ""
//           ? `${privateUrl}:80/productos/registrar`
//           : `${publicUrl}:80/productos/registrar`;

//       const response = await axios.post(urlRegistrarProductos, productoData);

//       if (response.status === 200 || response.status === 202) {
//         setMensaje("Producto agregado exitosamente");
//         setNombre("");
//         setPrecio("");
//         setDetalle("");
//         setColor("");
//         setCorte("");
//         setTela("");
//         setGenero("");
//         setTemporada("");
//         setSelectedCategoria("");
//         setSelectedTalles([]);
//       }
//     } catch (error) {
//       console.error("Error en la solicitud:", error);
//     }
//   };

//   return (
//     <div className={styles.formContainer}>
//       <h3>Agregar Producto</h3>
//       <Form
//         onSubmit={handleSubmit}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "stretch",
//         }}
//       >
//         <Form.Group style={{ marginBottom: "2%" }}>
//           <Form.Label>Nombre</Form.Label>
//           <Form.Control
//             style={{ width: "50%" }}
//             type="text"
//             value={nombre}
//             placeholder="Ingrese nombre del producto"
//             onChange={(e) => setNombre(e.target.value.toLowerCase())}
//           />
//         </Form.Group>

//         <Form.Group style={{ marginBottom: "2%" }}>
//           <Form.Label>Precio</Form.Label>
//           <Form.Control
//             style={{ width: "35%" }}
//             type="number"
//             value={precio}
//             placeholder="Ingrese el precio del producto"
//             onChange={(e) => setPrecio(e.target.value.toLowerCase())}
//           />
//         </Form.Group>

//         <Form.Group style={{ marginBottom: "2%" }}>
//           <Form.Label>Detalle</Form.Label>
//           <Form.Control
//             style={{ width: "50%" }}
//             as="textarea"
//             value={detalle}
//             placeholder="Ingrese el detalle del producto"
//             onChange={(e) => setDetalle(e.target.value.toLowerCase())}
//           />
//         </Form.Group>

//         <Form.Group style={{ marginBottom: "2%" }}>
//           <Form.Label>Color</Form.Label>
//           <Form.Control
//             style={{ width: "35%" }}
//             type="text"
//             value={color}
//             placeholder="Ingrese el color del producto"
//             onChange={(e) => setColor(e.target.value.toLowerCase())}
//           />
//         </Form.Group>

//         {/* -------------------------------------------------------------- */}

//         <div className={styles.checks}>
//           <Form.Group style={{ marginBottom: "2%" }}>
//             <Form.Label>Telas:</Form.Label>
//             {telas.map((option, index) => (
//               <Form.Check
//                 key={index}
//                 type="checkbox"
//                 label={option}
//                 value={option}
//                 checked={tela === option}
//                 onChange={() => setTela(option)}
//               />
//             ))}
//           </Form.Group>

//           <Form.Group style={{ marginBottom: "2%" }}>
//             <Form.Label>Corte:</Form.Label>
//             {cortes.map((option, index) => (
//               <Form.Check
//                 key={index}
//                 type="checkbox"
//                 label={option}
//                 value={option}
//                 checked={corte === option}
//                 onChange={() => setCorte(option)}
//               />
//             ))}
//           </Form.Group>

//           <Form.Group style={{ marginBottom: "2%" }}>
//             <Form.Label>Generos:</Form.Label>
//             {generos.map((option, index) => (
//               <Form.Check
//                 key={index}
//                 type="checkbox"
//                 label={option}
//                 value={option}
//                 checked={genero === option}
//                 onChange={() => setGenero(option)}
//               />
//             ))}
//           </Form.Group>

//           <Form.Group style={{ marginBottom: "2%" }}>
//             <Form.Label>Temporadas:</Form.Label>
//             {temporadas.map((option, index) => (
//               <Form.Check
//                 key={index}
//                 type="checkbox"
//                 label={option}
//                 value={option}
//                 checked={temporada === option}
//                 onChange={() => setTemporada(option)}
//               />
//             ))}
//           </Form.Group>
//         </div>

//         {/* ------------------------------------------------------------------ */}

//         <Form.Group style={{ marginBottom: "2%" }}>
//           <Form.Label>Categoría</Form.Label>
//           <Form.Select
//             style={{ width: "35%" }}
//             id="categoria"
//             value={selectedCategoria}
//             onChange={(e) => {
//               setSelectedCategoria(e.target.value);
//             }}
//           >
//             <option value="">Selecciona una categoría</option>
//             {categorias.map((categoria) => (
//               <option key={categoria.selectedId} value={categoria.selectedId}>
//                 {categoria.titulo}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>

//         {/* ------------------------------------------------------------------ */}

//         <Form.Group style={{ marginBottom: "2%" }}>
//           <Form.Label>Talles:</Form.Label>
//           {talles.map((option, index) => (
//             <Form.Check
//               key={index}
//               type="checkbox"
//               label={option}
//               value={option}
//               checked={selectedTalles.includes(option)}
//               onChange={() => handleTalleChange(option)}
//             />
//           ))}
//         </Form.Group>

//         {/* ---------------------------------------------------------------------- */}

//         <Button
//           type="submit"
//           style={{
//             width: "25%",
//             backgroundColor: "#E3B04B",
//             border: "none",
//             color: "#2B2B28",
//           }}
//         >
//           Agregar Producto
//         </Button>
//       </Form>
//       {mensaje && <Alert variant="success">{mensaje}</Alert>}{" "}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";

export function AñadirProducto() {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: 0,
    detalle: "",
    color: "",
    categorias: {
      idCategoria: 1,
      titulo: "",
      descripcion: "",
      eliminarCategoria: false,
      // urlimagen: "",
    },
    talles: [], // Cambia talles a un array de objetos
  });

  const [categorias, setCategorias] = useState([]);
  const [token, setToken] = useState("");
  const [tallesSeleccionados, setTallesSeleccionados] = useState([]);
  const [talles, setTalles] = useState([]);

  useEffect(() => {
    // Obtener token de localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    // Obtener categorías mediante una solicitud GET
    axios
      .get("http://34.229.181.144/categorias/listarcategorias-all", {
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

    // Obtener talles mediante una solicitud GET
    axios
      .get("http://34.229.181.144/talles/listartalles-all", {
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
  }, []);

  const handleTalleChange = (e) => {
    const talleId = e.target.value;
    if (tallesSeleccionados.includes(talleId)) {
      // Si el talle ya estaba seleccionado, quitarlo de la lista
      setTallesSeleccionados((prevTalles) =>
        prevTalles.filter((id) => id !== talleId)
      );
      setProducto((prevProducto) => ({
        ...prevProducto,
        talles: prevProducto.talles.filter(
          (talle) => talle.idMedida !== parseInt(talleId, 10) // Convierte a número entero
        ),
      }));
    } else {
      // Si el talle no estaba seleccionado, agregarlo a la lista
      setTallesSeleccionados((prevTalles) => [...prevTalles, talleId]);
      const selectedTalle = talles.find(
        (talle) => talle.idMedida === parseInt(talleId, 10) // Convierte a número entero
      );
      setProducto((prevProducto) => ({
        ...prevProducto,
        talles: [...prevProducto.talles, selectedTalle],
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };

  const handleCategoriaChange = (e) => {
    const selectedCategoriaId = e.target.value;
    const selectedCategoria = categorias.find(
      (categoria) => categoria.idCategoria === selectedCategoriaId
    );

    if (selectedCategoria) {
      setProducto({
        ...producto,
        categorias: {
          idCategoria: selectedCategoria.idCategoria,
          titulo: selectedCategoria.titulo,
          descripcion: selectedCategoria.descripcion,
          urlimagen: selectedCategoria.urlimagen,
        },
      });
    } else {
      // Manejar el caso en que no se encontró la categoría seleccionada
      console.error("Categoría no encontrada para el ID seleccionado.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar una solicitud POST para agregar el producto sin el token de autorización
    axios
      .post("http://34.229.181.144/productos/registrar", producto)
      .then((response) => {
        console.log("Producto agregado exitosamente:", response.data);
        // Reiniciar el formulario o redirigir a otra página
      })
      .catch((error) => {
        console.error("Error al agregar el producto:", error);
      });
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={producto.precio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="detalle">Detalle:</label>
          <input
            type="text"
            id="detalle"
            name="detalle"
            value={producto.detalle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={producto.color}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            onChange={handleCategoriaChange}
            required
          >
            <option value="">Seleccionar Categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.titulo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Talles:</label>
          {talles.map((talle) => (
            <div key={talle.idMedida}>
              <label>
                <input
                  type="checkbox"
                  name="tallesSeleccionados"
                  value={talle.idMedida.toString()} // Convierte a cadena de texto
                  onChange={handleTalleChange}
                  checked={tallesSeleccionados.includes(
                    talle.idMedida.toString()
                  )}
                />
                {talle.talle}
              </label>
            </div>
          ))}
        </div>

        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}
