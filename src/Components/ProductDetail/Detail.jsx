import React from 'react'
import Carousel from '../Carousel/Carousel'
import { DatePicker } from '@mui/x-date-pickers'
import styles from './Detail.module.css'




const Detail = () => {
  return (
    <div className={styles.detalleProducto}>
      
      
      <h2>Titulo Producto</h2>
      
      <Carousel className={styles.carousel}/>
      
      <div className={styles.precioReserva}>
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
