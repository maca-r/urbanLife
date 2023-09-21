import React, { useEffect, useState } from 'react'
import { useContextoGlobal } from '../GlobalContext'
import Table from 'react-bootstrap/Table';


const Reserva = () => {

    const {dataState} = useContextoGlobal()
    
    const [productoReserva, setProductoReserva] = useState({})
    
    useEffect(() => {
        setProductoReserva(dataState?.producto)
        console.log(productoReserva);
    })

    const imageUrl =
    productoReserva.imagenes && productoReserva.imagenes[0] 
    ? productoReserva.imagenes[0].urlImagen 
    : "";


    return (
    <div>
        <Table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Precio</th>
            <th>Imagen</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{productoReserva.idProducto}</td>
            <td>{productoReserva.nombre}</td>
            <td>{productoReserva.precio}</td>
            <img src={imageUrl} style={{width: "20%"}}></img>
        </tr>
        </tbody>
        </Table>
    </div>
    )
}

export default Reserva
