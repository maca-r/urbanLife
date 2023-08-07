import React, { useEffect, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import styles from './Detail.module.css'

import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';




const Detail = () => {


  //useState y useEffect para que aparezca o desaparezca el carrousel en base a responsive,
  //ya que por las clases que trae de base el componente Carousel de bootstrap es la forma de acceder a las clases del mismo
  const [carouselVisible, setCarouselVisible] = useState("block")
  const [dimensions, setDimensions] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      if(dimensions >= 480) {
        setCarouselVisible("none")
        setDimensions(window.innerWidth)
      } else{

        setCarouselVisible("block")
      }

    }
    window.addEventListener("load",handleResize)
    window.addEventListener("resize", handleResize)

  },[dimensions])

  

  const images = [
    'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1603252109612-24fa03d145c8?ixlib=rb-4.0.3&  ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1603251578711-3290ca1a0187?ixlib=rb-4.0.3&  ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1602810319428-019690571b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const handleImageClick = (index) => {
    setSelectedImage(images[index]);
  };


  return (
    <div className={styles.detalleProducto}>
            
      <h2>Titulo Producto</h2>
      
      
      <Carousel className={"d-" + carouselVisible} style={{width:"80%"}}>
        <Carousel.Item >
            <img src="https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
            alt="" 
            style={{width:"100%"}} />
        </Carousel.Item>
        <Carousel.Item>
            <img src="https://images.unsplash.com/photo-1603252109612-24fa03d145c8?ixlib=rb-4.0.3&  ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
            alt=""
            style={{width:"100%"}}/>
        </Carousel.Item>
        <Carousel.Item>
            <img src="https://images.unsplash.com/photo-1603251578711-3290ca1a0187?ixlib=rb-4.0.3&  ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" 
            style={{width:"100%"}}/>
        </Carousel.Item>
      </Carousel>
      
      <div className={styles.containerImg}>
        
          <div className={styles.largeImg}>
            <Image src={selectedImage} fluid/>
          </div>
          <div className={styles.smallImg}>
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                className={`${selectedImage === image ? 'selected' : ''}`}
                onClick={() => handleImageClick(index)}
                thumbnail
                style={{maxWidth: "auto",
                  height: "auto",
                  cursor: "pointer",
                  }}
              />
            ))}
          </div>
      
    </div>

    <button></button>
      

    <div className={styles.tallesReserva}>
        <button>TALLE S</button>
        <button>TALLE M</button>
        {/* <DatePicker className={styles.datePicker} /> */}
    </div>

    <div className={styles.precioReserva} >
        <h5>PRECIO: $100</h5>
        <button>RESERVAR</button>
    </div>
        
      

    </div>
  )
}

export default Detail
