import { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Modal from 'react-bootstrap/Modal';


const Detail = () => {


  //useState y useEffect para que aparezca o desaparezca el carrousel en base a responsive,
  //ya que por las clases que trae de base el componente Carousel de bootstrap es la forma de acceder a las clases del mismo
  const [carouselVisible, setCarouselVisible] = useState("block")
    const [dimensions, setDimensions] = useState(window.innerWidth)

    useEffect(() => {
    function handleResize() {
        if(dimensions >= 780) {
            setCarouselVisible("none")
            setDimensions(window.innerWidth)
    } else{

    setCarouselVisible("block")
        }

        }
        window.addEventListener("resize", handleResize)
        window.addEventListener("load",handleResize)
        

    },[dimensions])

  

  const images = [
    
    'https://images.unsplash.com/photo-1603252109612-24fa03d145c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1603251578711-3290ca1a0187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1603252110971-b8a57087be18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    
  ];

  const imagesGallery = [
    "https://images.unsplash.com/photo-1602810316693-3667c854239a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1602810319250-a663f0af2f75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/flagged/photo-1564468781192-f023d514222d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1602810318660-d2c46b750f88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
  ]

  const talles = [
    "TALLE S", "TALLE M", "TALLE L"
  ]


  const navigate = useNavigate()
  // const [selectedImage, setSelectedImage] = useState(images[0]);
  // const handleImageClick = (index) => {
  //   setSelectedImage(images[index]);
  // };

  const [show, setShow] = useState(false);

  return (
    
    <div className={styles.detalleProducto}>

      <div className={styles.tituloBackButton}>
        <h3>Titulo Producto</h3>

        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowBackIcon/>
        </button>
      </div>
            
      

      <Carousel className={"d-" + carouselVisible} 
      style={{width:"80%"}}
      data-bs-theme="dark">
      {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img 
                src={image}
                style={{width: "100%",
                  height: "auto",
                  
                }}
                />
                </Carousel.Item>
                
            ))}
      </Carousel>
      
      <div className={styles.container}>
        

        {/* código para una img grande donde se vea la que se selecciona desde las img más chicas */}
          {/* <div className={styles.largeImg}>
            <img src={selectedImage} />
          </div> */}

          <div className={styles.leftContainer}>
            <img src='https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80' alt="" />
          </div>


          <div className={styles.rightContainer}>
            
            <div className={styles.smallImages}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                // className={`${selectedImage === image ? 'selected' : ''}`} solo en el caso de que en la grande se vea la chiquita
                // onClick={() => handleImageClick(index)}
                
                style={{maxWidth: "auto",
                  height: "auto",
                  cursor: "pointer",
                  }}
              />
            ))}
            </div>

            <button className={styles.verMas}
            onClick={() => setShow(true)}>
              Ver más
            </button>

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
            <Modal.Body style={{display: "grid",
                gridTemplateColumns: "30% 40%",
                gridTemplateRows: "30% 40%",
                gridColumnGap: "10px",
                gridRowGap: "10px",
                justifyItems: "center",
                alignItems: "stretch",
                justifyContent: "center"}}>
            {imagesGallery.map((image, index) => (
              <img
                key={index}
                src={image}

                style={{
                  width: "",
                  margin: "3%"
                  
                  }}
              />
            ))}
            </Modal.Body>
            </Modal>

            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem consequatur tempore eligendi officia earum autem a dolorum repellendus ipsam explicabo? </p>
          
            <div className={styles.tallesCalendario}>

                <div className={styles.talles}>
                  {talles.map((talle, index) => (
                    <button key={index}>
                      {talle}
                    </button>
                  ))}
                </div>
                  
                <form className={styles.calendar} action="">
                  <input type="date"/>
                </form>
              </div>

              <div className={styles.precioReserva} >
                  <h5>PRECIO: $100</h5>
                  <button>RESERVAR</button>
              </div>
            </div>

            
      
      </div>

      
      


    <span className={styles.tallesPrecioM}>

      <div className={styles.tallesCalendario}>

        <div className={styles.talles}>
          {talles.map((talle, index) => (
            <button key={index}>
              {talle}
            </button>
          ))}
        </div>
        
        <form className={styles.calendar} action="">
          <input type="date"/>
        </form>
      </div>

      

      <div className={styles.precioReserva} >
          <h5>PRECIO: $100</h5>
          <button>RESERVAR</button>
      </div>
    </span>
    
        
      

    </div>
  )
}

export default Detail
