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
import DataPicker from "../DataPicker/DataPicker";
import SearchIcon from "@mui/icons-material/Search";

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

  const handleChange = (e) => {
    // console.log(dataState.productos);
    // console.log(productosOrdenados);
    productosOrdenados.forEach((producto) => {
      if (producto.nombre == e.target.value) {
        //console.log(producto.idProducto);
        console.log(productosOrdenados.indexOf(producto));
        //setId(producto.idProducto - 1);
        setId(productosOrdenados.indexOf(producto));
        //setProductoBuscado(dataState.productos[id]);
        //console.log(productoBuscado);
      }
    });
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // realizariamos las solicitudes a la API.
    // console.log(dataState.producto);
    // setProductoBuscado(dataState.productos[id])
    console.log(e.target);
    setProductoBuscado(productosOrdenados[id]);
    setSearchText("");
    console.log(productoBuscado);
    console.log("Texto de búsqueda:", searchText);
  };

  // const urlProductos = `http://localhost:80/productos`

  // useEffect(() => {
  //   try{
  //     axios.get(urlProductos)
  //     .then(response => {
  //       console.log(response.data)
  //       setDetalle(response.data)
  //     })
  //   } catch (error) {
  //     console.error("error al obtener productos")
  //   }
  // },[urlProductos])

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

  const [categorias, setCategorias] = useState([]);
  const urlCategorias = "http://localhost:80/categorias/listarcategorias-all";

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
    "http://localhost:80/productos/listaproductos-aleatorio";

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

  /*PAGINACION */

  // const [paginaActual, setPaginaActual] = useState(1)
  // const elementosPagina = []
  // for (let number = 1; number <= productosAleatorios.length; number++) {
  //     elementosPagina.push(number);

  // }

  return (
    <div className={styles.body}>
      {/* BUSCADOR */}

      {/* <div className={styles.search}> */}

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
          ></input>
        </div>

        {/* <input type="date" onChange={(e) => console.log(e.target.value)} /> */}

        <DataPicker className={styles.calendar} />

        <button className={styles.buscarButton}>Realizar búsqueda</button>
      </form>
      {/* </div> */}

      <div className={styles.bannerProducto}>
        {productoBuscado && Object.keys(productoBuscado).length > 0 ? (
          <div style={{ width: "50%", height: "50%", marginLeft: "25%" }}>
            <Card data={productoBuscado}></Card>
          </div>
        ) : (
          <img
            className={styles.imagenBanner}
            src="./images/Imagen LandingPage.png"
            alt=""
          />
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
                <Link to={`/cd ` + categoria.idCategoria} key={index}>
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
