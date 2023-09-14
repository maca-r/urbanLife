/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import WcIcon from "@mui/icons-material/Wc";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { useContextoGlobal } from "../GlobalContext";
import Skeleton from '@mui/material/Skeleton';

const Detail = () => {
  //useState y useEffect para que aparezca o desaparezca el carrousel en base a responsive,
  //ya que por las clases que trae de base el componente Carousel de bootstrap es la forma de acceder a las clases del mismo
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

  // const desktopMediaQuery = window.matchMedia('min-width: 780px')

  // useEffect(() => {
  //   desktopMediaQuery.addEventListener('change', (event) =>
  //   { if (event.matches) {
  //     setCarouselVisible("none")

  //   }}

  //   )
  // },[desktopMediaQuery])

  // console.log(desktopMediaQuery);
  const {dataState,dataDispatch} = useContextoGlobal()
  const params = useParams();
  const urlDetalleProducto = `http://localhost:80/productos/obtener/${params.id}`;
  
  

  useEffect(() => {
    try {
      axios.get(urlDetalleProducto).then((response) => {
        console.log(response.data);
        // setDetalle(response.data);
        dataDispatch({type: "GET_A_PRODUCT", payload: response.data})
        
      });
    } catch (error) {
      console.error("error al obtener producto con id " + `${params.id}`);
    }

    
  }, [urlDetalleProducto]);

  //const imagenesOrdenadas = [...dataState.producto.imagenes].sort((a,b) => a.idImagen - b.idImagen) 

  const imagenesOrdenadas = 
    dataState.producto.imagenes
    ? [...dataState.producto.imagenes].sort((a, b) => a.idImagen - b.idImagen)
    : [];

  console.log(imagenesOrdenadas);
  
  // const imagenes = dataState.producto.imagenes
  // if (imagenes.length > 0){
  //   console.log(imagenes.length);
  // }

  //const imagenesOrdenadas = [...producto.imagenes].sort((a,b) => a.idImagen - b.idImagen) 
  
  //console.log([...(dataState.producto).imagenes]);

  // const images = [
  //   "https://acdn.mitiendanube.com/stores/008/089/products/_campera-pragmatico-oxido_041-304a2ebf0f06670f1b16903373804733-640-0.webp",
  //   "https://acdn.mitiendanube.com/stores/008/089/products/_campera-pragmatico-oxido_071-87ed1ac2935fa5da4b16903373805560-640-0.webp",
  //   "https://acdn.mitiendanube.com/stores/008/089/products/_campera-pragmatico-oxido_051-aa7e5a2891fb73660e16903373802933-640-0.webp",
  //   "https://acdn.mitiendanube.com/stores/008/089/products/_campera-pragmatico-oxido_061-6adf07e0e97da7cf3316903373804049-640-0.webp",
  // ];

  // const imagesGallery = [
  //   "https://images.unsplash.com/photo-1602810316693-3667c854239a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  //   "https://images.unsplash.com/photo-1602810319250-a663f0af2f75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  //   "https://images.unsplash.com/flagged/photo-1564468781192-f023d514222d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  //   "https://images.unsplash.com/photo-1602810318660-d2c46b750f88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  // ];


  //LLAMADA API TALLES
  
  // const urlProductoTalle = `http://localhost:80/productomedida/listarproductomedida-all`;

  // useEffect(() => {
  //   try {
  //     axios.get(urlProductoTalle).then((response) => {
  //       console.log(response.data);
        
  //     });
  //   } catch (error) {
  //     console.error("error al obtener detalles");
  //   }
  // }, [urlProductoTalle]);

  const talles = ["TALLE S", "TALLE M", "TALLE L"];

  const navigate = useNavigate();
  // const [selectedImage, setSelectedImage] = useState(images[0]);
  // const handleImageClick = (index) => {
  //   setSelectedImage(images[index]);
  // };

  const [show, setShow] = useState(false);

  // const caracteristicas = ["color", "tela", "género", "temporada", "evento"];

  const caracteristicas = [
    (dataState.producto.color).toUpperCase(),
    (dataState.producto.tela).toUpperCase(),
    (dataState.producto.genero).toUpperCase(),
    (dataState.producto.temporada).toUpperCase(),
    (dataState.producto.corte).toUpperCase(),
  ];

  const iconoCaracteristicas = [
    <ColorLensIcon sx={{ color: "#E3B04B" }} />,
    <CheckroomIcon sx={{ color: "#E3B04B" }} />,
    <WcIcon sx={{ color: "#E3B04B" }} />,
    <DeviceThermostatIcon sx={{ color: "#E3B04B" }} />,
    <ContentCutIcon sx={{ color: "#E3B04B" }} />,
  ];


  

  return (
    <div className={styles.detalleProducto}>
      
      <div className={styles.tituloBackButton}>
        <h3>{dataState.producto.nombre}</h3>

        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </button>
      </div>

    {/* CAROUSEL MOBILE */}
      <Carousel
        className={"d-" + carouselVisible}
        style={{ width: "80%"}}
        data-bs-theme="dark"
      >
        {/* {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img src={image} style={{ width: "100%", height: "auto" }} />
          </Carousel.Item>
        ))}  */}
        {imagenesOrdenadas.map((image, index) => (
          <Carousel.Item key={index}>
            <img src={image.urlImagen} style={{ width: "100%", height: "auto" }} />
            <Carousel.Caption >
              <p style={{width: "20%",color: "white", backgroundColor: "#E3B04B", fontSize: "0.8rem"}}>
                {index+1}/{imagenesOrdenadas.length}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>


    {/* CONTAINERS DESKTOP */}

      <div className={styles.containerImagenes}>
        {/* código para una img grande donde se vea la que se selecciona desde las img más chicas */}
        {/* <div className={styles.largeImg}>
            <img src={selectedImage} />
          </div> */}

        
        <div className={styles.leftContainer}>
          {/* <img
            src="https://acdn.mitiendanube.com/stores/008/089/products/_campera-pragmatico-oxido_011-482f8f219a675f850916903373802103-640-0.webp"
            alt=""
          /> */}
          {imagenesOrdenadas.length ? 
            <img src={imagenesOrdenadas[0].urlImagen} alt={imagenesOrdenadas[0].urlImagen} />
            
            :
            <Skeleton variant="rectangular" width={210} height={60} />}
          {/* <img src={imagenesOrdenadas[0].urlImagen} alt={imagenesOrdenadas[0].urlImagen} /> */}
          
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.smallImages}>
            {/* {images.map((image, index) => (
              <img
                key={index}
                src={image}
                // className={`${selectedImage === image ? 'selected' : ''}`} solo en el caso de que en la grande se vea la chiquita
                // onClick={() => handleImageClick(index)}

                // style={{maxWidth: "auto",
                //   height: "auto",

                //   }}
              />
            ))} */}
            {imagenesOrdenadas.slice(1, imagenesOrdenadas.length).map((image, index) => (
              <img
                key={index}
                src={image.urlImagen}
                // className={`${selectedImage === image ? 'selected' : ''}`} solo en el caso de que en la grande se vea la chiquita
                // onClick={() => handleImageClick(index)}

                // style={{maxWidth: "auto",
                //   height: "auto",

                //   }}
              />
            ))}
          </div>

          <Button variant="light" 
                  className={styles.verMas} 
                  onClick={() => setShow(true)}>
            Ver más
          </Button>


          {/* MODAL CON FOTOS BOTON VER MAS */}

          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            fullscreen={true}
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Galería
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                display: "flex",
                justifyItems: "center",
                alignItems: "stretch",
                justifyContent: "center",
              }}
            >
              {/* {imagesGallery.map((image, index) => (
              <img
                key={index}
                src={image}

                style={{
                  width: "",
                  margin: "3%"
                  
                  }}
              />
            ))} */}

              {/* <Box sx={{ width: "auto", height: "auto", overflowY: "scroll" }}>
                <ImageList variant="masonry" cols={4} gap={8}>
                  {imagesGallery.map((image, index) => (
                    <ImageListItem key={index}>
                      <img src={image} srcSet={image} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box> */}


              <Box sx={{ width: "auto", height: "auto", overflowY: "scroll" }}>
                <ImageList variant="masonry" cols={5} gap={8}>
                  {imagenesOrdenadas.map((image, index) => (
                    <ImageListItem key={index}>
                      <img src={image.urlImagen} srcSet={image.urlImagen} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>

              {/* {imagesGallery.map((image, index) => (
              <img
                key={index}
                src={image}

                style={{
                  width: "",
                  margin: "3%"
                  
                  }}
              />
            ))} */}
            </Modal.Body>
          </Modal>


          {/* DETALLE DEL PRODUCTO */}
          {/* <p>{detalle.detalle} </p>

          <div className={styles.tallesCalendario}>
            <div className={styles.talles}>
              {talles.map((talle, index) => (
                <button key={index}>{talle}</button>
              ))}
            </div>

            <form className={styles.calendar} action="">
              <input type="date" />
            </form>
          </div>

          <div className={styles.precioReserva}>
            <h5>PRECIO: ${detalle.precio}</h5>
            <button>RESERVAR</button>
          </div> */}
        </div>
      </div>


      <div className={styles.containerDetalles}>

        <div className={styles.detalleCaracteristicas}>

          <p>{dataState.producto.detalle} </p>

          <div className={styles.caracteristicasBox}>
            <h4>Caracteristicas</h4>
            <div className={styles.caracteristicas}>
              {caracteristicas.map((caracteristica, index) => (
                <ul key={index}>
                  <li>
                    <i>{iconoCaracteristicas[index]}</i>
                    {caracteristica}
                  </li>
                </ul>
              ))}
            </div>
          </div>
              
        </div>
              
        <div className={styles.detalleReserva}>

        

          <h5>${dataState.producto.precio}</h5>
              
              
          <div className={styles.talles}>
            {talles.map((talle, index) => (
              <button className={styles.talleButton} key={index}>{talle}</button>
            ))}
          </div>
            
            
          <div className={styles.reserva}>
            <form className={styles.calendar} action="">
                  <input type="date" />
            </form>
            
            <button className={styles.reservaButton}>reservar</button>
          </div>
        </div>
      </div>

      

      {/* <span className={styles.tallesPrecioM}>
        <div className={styles.tallesCalendario}>
          <div className={styles.talles}>
            {talles.map((talle, index) => (
              <button key={index}>{talle}</button>
            ))}
          </div>

          <form className={styles.calendar} action="">
            <input type="date" />
          </form>
        </div>

        <div className={styles.precioReserva}>
          <h5>PRECIO: ${detalle.precio}</h5>
          <button>RESERVAR</button>
        </div>
      </span> */}

      
    </div>
  );
};

export default Detail;
