import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Carousel from "react-bootstrap/Carousel";
// import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
// import { routes } from "../../Routes/routes";
// import Pagination from "react-bootstrap/Pagination";
// import { Search } from "../Icon";
import axios from "axios";
import { useContextoGlobal } from "../GlobalContext.jsx";
import Card from "../Card/Card";
// import DataPicker from "../DataPicker/DataPicker";
import SearchIcon from "@mui/icons-material/Search";
// import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import img2 from '../../Images/img2.jpg';
import img3 from '../../Images/img3.webp';
import img4 from '../../Images/img4.webp';
import img5 from '../../Images/img5.jpg';
import img6 from '../../Images/img6.webp';
import img1 from '../../Images/img7.webp';



const Home = () => {
  const [searchText, setSearchText] = useState("");

  const { dataState, dataDispatch } = useContextoGlobal();

  const [id, setId] = useState();

  const [productoBuscado, setProductoBuscado] = useState({});
  {
    console.log(productoBuscado);
  }

  const productosOrdenados = [...dataState.productos].sort(
    (a, b) => a.idProducto - b.idProducto
  );
  //console.log(productosOrdenados);

  const [selectedStartDate, setSelectedStartDate] = useState("");

  const [selectedEndDate, setSelectedEndDate] = useState("");

  const handleChange = (e) => {
    // console.log(dataState.productos);
    // console.log(productosOrdenados);
    productosOrdenados.forEach((producto) => {
      //      if (producto.nombre == e.target.value) {
      if (producto.nombre.toLowerCase().includes(e.target.value)) {
        //console.log(producto.idProducto);
        //setId(producto.idProducto - 1);
        setId(productosOrdenados.indexOf(producto));
        //setProductoBuscado(dataState.productos[id]);
        console.log(productoBuscado);
      }
    });
    setSearchText(e.target.value);
  };

  const [busqueda, setBusqueda] = useState({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // realizariamos las solicitudes a la API.
    // console.log(dataState.producto);

    //setProductoBuscado(dataState.productos[id])

    setProductoBuscado(productosOrdenados[id]);
    setSearchText("");
    console.log(productoBuscado);
    console.log("Texto de búsqueda:", searchText);
    const fields = Object.fromEntries(new window.FormData(e.target));
    console.log(fields);
    setBusqueda({
      nombre: fields.nombre,
      fechaInicio: fields.fechaInicio,
      fechaFin: fields.fechaFin,
    });
    console.log(busqueda);
    //console.log(fields.desde);
    //console.log(fields.hasta);
    setSelectedStartDate("");
    setSelectedEndDate("");
  };

  const [carouselVisible, setCarouselVisible] = useState("none");
  // const [dimensions, setDimensions] = useState(window.innerWidth)

  function handleResize() {
    if (window.innerWidth >= 780) {
      setCarouselVisible("none");
    } else {
      setCarouselVisible("block");
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
  }, []);

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const [categorias, setCategorias] = useState([]);

  const urlCategorias =
    privateUrl != ""
      ? `${privateUrl}:80/categorias/listarcategorias-all`
      : `${publicUrl}:80/categorias/listarcategorias-all`;

  useEffect(() => {
    try {
      axios.get(urlCategorias).then((response) => {
        const categoriasNoEliminadas = response.data.filter(
          (categoria) => categoria.eliminarCategoria === false
        );
        console.log(response.data);
        setCategorias(categoriasNoEliminadas);
      });
    } catch (error) {
      console.error("error al obtener categorias");
    }
  }, [urlCategorias]);

  // const categoriaCards = [
  //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
  //     categoria: "categoria 1"},
  //     { imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
  //     categoria: "categoria 2"},
  //     { imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
  //     categoria: "categoria 3"},
  //     { imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
  //     categoria: "categoria 4"}
  // ]

  // const categoriasImagenes = [
  //   "https://acdn.mitiendanube.com/stores/008/089/products/_campera-pragmatico-oxido_081-83e6bde4313e1cde2d16904126922417-640-0.webp",
  //   "https://acdn.mitiendanube.com/stores/008/089/products/_pantalon-gollic-gris_011-3777820bf7b7dab9e316856674617159-640-0.webp",
  //   "https://acdn.mitiendanube.com/stores/008/089/products/_camisa-nazgul-negro_071-9fdb49f56179eac55a16771641208498-640-0.webp",
  //   "https://acdn.mitiendanube.com/stores/008/089/products/_cartera-chain-b-negro_011-e4c3d9205f09b625f216878911243673-640-0.webp",
  // ];

  // const productoAleatorio = [
  //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
  //     titulo: "Product Name",
  //     desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
  //     },
  //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
  //     titulo: "Product Name",
  //     desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
  //     },
  //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
  //     titulo: "Product Name",
  //     desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
  //     },
  //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
  //     titulo: "Product Name",
  //     desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
  //     },
  //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
  //     titulo: "Product Name",
  //     desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
  //     },
  //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
  //     titulo: "Product Name",
  //     desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
  //     },
  // ]

  const [productosAleatorios, setProductosAleatorios] = useState([]);

  const urlProductosAleatorios =
    privateUrl != ""
      ? `${privateUrl}:80/productos/listaproductos-aleatorio`
      : `${publicUrl}:80/productos/listaproductos-aleatorio`;

  useEffect(() => {
    try {
      axios.get(urlProductosAleatorios).then((response) => {
        console.log(response.data);
        setProductosAleatorios(response.data);
      });
    } catch (error) {
      console.error("error al obtener productos aleatorios");
    }
  }, [urlProductosAleatorios]);

  {
    console.log(productosAleatorios);
  }
  /*PAGINACION */

  // const [paginaActual, setPaginaActual] = useState(1)
  // const elementosPagina = []
  // for (let number = 1; number <= productosAleatorios.length; number++) {
  //     elementosPagina.push(number);

  // }

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-0${month}-${date}`;
  }

  const [disabledButton, setDisabledButton] = useState(true);

  {
    console.log(searchText, selectedStartDate, selectedEndDate);
  }
  const toggleDisabledButton = () => {
    if (searchText == "" && selectedStartDate != "" && selectedEndDate != "") {
      setDisabledButton(false);
    }
    if (searchText != "" && selectedStartDate == "" && selectedEndDate == "") {
      setDisabledButton(false);
    }
    if (searchText != "" && selectedStartDate != "" && selectedEndDate == "") {
      setDisabledButton(true);
    }
    if (searchText != "" && selectedStartDate == "" && selectedEndDate != "") {
      setDisabledButton(true);
    }
    if (searchText != "" && selectedStartDate != "" && selectedEndDate != "") {
      setDisabledButton(false);
    }
  };

  useEffect(() => {
    toggleDisabledButton();
  });

  return (
    <div className={styles.body}>
      {/* <div className={styles.titulo}>
        <h1>URBAN   LIFE</h1>
      </div> */}
      {/* BUSCADOR */}

      <div className={styles.search}>
        <form onSubmit={handleSubmit} className={styles.formBusqueda}>
          {/* <figure>
                <Search />
              </figure> */}

          <div className={styles.inputSearch}>
            <SearchIcon />

            <input
              type="text"
              placeholder="Buscar"
              value={searchText}
              onChange={handleChange}
              name="nombre"
            ></input>

            {searchText != "" && (
              <ul>
                {dataState.productos
                  .filter((producto) =>
                    producto.nombre.toLowerCase().includes(searchText)
                  )
                  .map((producto) => (
                    <li
                      className={styles.listaBusqueda}
                      key={producto.idProducto}
                      onClick={(e) => setSearchText(e.target.innerHTML)}
                    >
                      {producto.nombre}
                    </li>
                  ))}
              </ul>
            )}

            {/* <Autocomplete
              options={titulos}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Producto"
              size="small"
              value={searchText}
              onChange={handleChange}
              />}
              

            /> */}
          </div>

          {/* <DataPicker className={styles.calendar} /> */}
          <div className={styles.inputCalendario}>
            <label style={{ fontSize: "0.8rem" }}>Desde</label>
            <input
              type="date"
              name="fechaInicio"
              value={selectedStartDate}
              onChange={(e) => {
                setSelectedStartDate(e.target.value);
              }}
              className={styles.calendar}
              min={getDate()}
            ></input>
          </div>

          <div className={styles.inputCalendario}>
            <label style={{ fontSize: "0.8rem"}}>Hasta</label>
            <input
              type="date"
              name="fechaFin"
              value={selectedEndDate}
              onChange={(e) => {
                setSelectedEndDate(e.target.value);
              }}
              className={styles.calendar}
            ></input>
          </div>

          <button className={styles.buscarButton} disabled={disabledButton}>
            Realizar búsqueda
          </button>
        </form>
      </div>

      <div className={styles.bannerProducto}>
        {productoBuscado && Object.keys(productoBuscado).length > 0 ? (
          <div style={{ width: "50%", height: "50%", marginLeft: "25%" }}>
            <Card data={productoBuscado}></Card>
          </div>
        ) : (
          <div className={styles.panel}>
                  <div className={styles.titulo}>
        <h1>URBAN   LIFE</h1>
      </div>          
            <div  className={styles.portada}    >
              <div className={styles.imagenesContenedor}>
                <img  src= {img1} alt="" />
                <div> <h1> </h1> </div>
              </div>
          
                <div className={styles.imagenesContenedor}>
              <div> <h1> </h1> </div>
                <img src= {img2} alt="" />
              </div>
          
                <div className={styles.imagenesContenedor}>
                <img src= {img3} alt="" />
                <div> <h1> </h1> </div>
              </div>
          
          
                <div className={styles.imagenesContenedor}>
                <div> <h1> </h1> </div>
                <img src=  {img4} alt="" />
          
              </div>
          
                <div className={styles.imagenesContenedor}>
                <img src=  {img5} alt="" />
                <div> <h1> </h1> </div>
              </div>
          
                <div className={styles.imagenesContenedor}>
                <div> <h1> </h1> </div>
                <img src=   {img6} alt="" />
              </div>
          </div    >
          
        </div>
        )}
      </div>

      {/* <div className={styles.productoItem}>
      <Card data={productoBuscado} >{console.log(productoBuscado)}</Card>
      </div> */}

      {/* {console.log(productoBuscado)}
      <div>{productoBuscado}</div> 

      {/* AGREGAR IMAGEN */}

      <div className={styles.categorias}>
        <h2>CATEGORIAS</h2>

        {!categorias.length == 0 ? (
          carouselVisible == "none" ? (
            <div className={styles.categoria}>
              {categorias.map((categoria, index) => (
                //<Link to={`/cd ` + categoria.idCategoria} key={index}>
                <Link to={`/categoria/${categoria.idCategoria} `} key={index}>
                  <img
                    // src={categoriasImagenes[index]}
                    src={categoria.urlimagen}
                    alt={`Imagen ${categoria.idCategoria}`}
                  />

                  <h6>{categoria.titulo}</h6>
                  <div></div>
                </Link>
              ))}
            </div>
          ) : (
            <Carousel
              className={"d-" + carouselVisible}
              data-bs-theme="dark"
              style={{ width: "80%" }}
            >
              {categorias.map((categoria, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={categoria.urlimagen}
                    style={{ width: "100%", height: "50%", cursor: "pointer" }}
                  />

                  <Carousel.Caption>
                    <h4
                      style={{
                        color: "#2B2B28",
                        backgroundColor: "#E3CE8D",
                        textAlign: "center",
                        textTransform: "uppercase",
                        width: "50%",
                        marginLeft: "25%",
                      }}
                    >
                      {categoria.nombreCategoria}
                    </h4>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          )
        ) : (
          <h3>Aún no hay categorias para mostrar</h3>
        )}
      </div>

      <div className={styles.producAleatorioBox}>
        <h2>PRODUCTOS</h2>

        {!productosAleatorios.length == 0 ? (
          <div className={styles.producAleatorio}>
            {productosAleatorios.map((producto, index) => (
              // <Link to={routes.detail} key={index} className={styles.productoItem}>
              //     <div>
              //         <img src={producto.imagen} alt={`Product ${index}`} />
              //     </div>
              //     <div className={styles.textoProduct}>
              //         <h5 className={styles.productoTitulo}>{producto.nombre}</h5>
              //         <h5>{producto.detalle}</h5>
              //     </div>
              // </Link>

              <div key={index} className={styles.productoItem}>
                <Card data={producto}>
                  {/* <Card.Img src="/images/logo.png" />
                <Card.Body>
                  <Card.Title
                    style={{ textTransform: "uppercase", width: "fit-content" }}
                  >
                    {producto.nombre}
                  </Card.Title>

                  <Card.Text>${producto.precio}</Card.Text>

                  <Link to={`/product/` + producto.idProducto}>
                    <button className={styles.detalleBoton}>detalle</button>
                  </Link>

                  <button onClick={addFav} className={styles.favBoton}><StarIcon style={{color: "#E3CE8D"}}/></button>
                </Card.Body> */}
                </Card>
              </div>
            ))}

            {/* <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    {elementosPagina.map((elemento, index) => (
                        <Pagination.Item key={index} 
                            onClick={(event) => setPaginaActual(event.target.value)} 
                            active={elemento === paginaActual}>
                            {elemento}
                        </Pagination.Item>
                    ))}
                    
                    
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination> */}
          </div>
        ) : (
          <h3>Aún no hay productos para mostrar</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
