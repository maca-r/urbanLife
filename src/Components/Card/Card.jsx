import React, { useState } from 'react'
import { useContextoGlobal } from '../GlobalContext'
import { Link } from 'react-router-dom'
import styles from "./Card.module.css";
import StarIcon from '@mui/icons-material/Star';
import { toast } from 'sonner'


const Card = (data) => {

    const [favorite, setFavorite] = useState("")

    const {dataState, dataDispatch} = useContextoGlobal()

    const addFav = () => {
    
    
        if (!dataState.favs.includes(data.data) ){
            dataDispatch({type: 'LIKE', payload: data.data})    
            console.log(data.data)
            setFavorite("like")
            toast.success('Producto agregado a favoritos')

        } 
        else {

            dataDispatch({type: 'DISLIKE', payload: data.data})
            setFavorite("dislike")
        }

        }

    return (
        <div className={styles.cardItem}>
            {/* {console.log(data.data.imagenes[0].urlImagen)} */}
            <img src={data.data.imagenes[0].urlImagen} />
                <div>
                    <h6
                        style={{ textTransform: "uppercase", width: "fit-content" }}
                    >
                        {data.data.nombre}
                        
                    </h6>

                    <p>${data.data.precio}</p>

                    <Link to={`/product/` + data.data.idProducto}>
                        <button className={styles.detalleBoton}>detalle</button>
                    </Link>

                    <button onClick={addFav} className={styles.favBoton}>{favorite === 'like' ? <StarIcon style={{color: "#E3CE8D"}}/> : <StarIcon style={{color:"gray"}}/>}</button>

                    
                </div>
        </div>
    )
}

export default Card
