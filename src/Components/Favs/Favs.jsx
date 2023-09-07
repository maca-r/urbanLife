import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';

const Favs = () => {
    console.log(localStorage.getItem("favs"));
    const [favs,setFavs] = useState([])

    useEffect(() => {
        const storedFavs = JSON.parse(localStorage.getItem("favs")) || [];
        setFavs(storedFavs);
    },[])

    const imageUrl = favs.imagenes?.[0]?.urlImagen || "";

    return (
        <div>
            <h2>Productos Favoritos</h2>
            
            
            
            {favs.map((favorito, index) => (
                
                <ul key={index}>
                    <li style={{display:"flex", justifyContent: "space-between", margin: "2%"}}>
                    <p>ID del Producto: {favorito.idProducto}</p>
                    <p>Nombre: {favorito.nombre}</p>
                    <p>Precio: $ {favorito.precio}</p>
                    {/* <p>Imágenes: {imageUrl}</p> */}
                    <img style={{ maxWidth: "100px" }} src={imageUrl} alt="" />
                    </li>
                
                </ul>

                
                    
                // <Card key={index} data={favorito}></Card>
            ))}  
        </div>
    )
}

export default Favs
