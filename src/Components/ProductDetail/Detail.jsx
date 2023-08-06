import React, { useEffect, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import styles from './Detail.module.css'

import Carousel from 'react-bootstrap/Carousel';




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

  {console.log(carouselVisible,dimensions)}
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

      <div className={styles.images}>
        
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
      
      
      <div className={styles.precioReserva} >
        <h5>PRECIO: $100</h5>
        <button>RESERVAR</button>
      </div>
        
      <div className={styles.tallesReserva}>
        <button>TALLE S</button>
        <button>TALLE M</button>
        {/* <DatePicker className={styles.datePicker} /> */}
      </div>

    </div>
  )
}

export default Detail
