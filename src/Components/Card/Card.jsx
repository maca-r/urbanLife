import { useState } from "react";
import { useContextoGlobal } from "../GlobalContext";
// import { Link } from 'react-router-dom'
import styles from "./Card.module.css";
import StarIcon from "@mui/icons-material/Star";
// import { toast } from 'sonner'

import { Link } from "react-router-dom";
import { toast } from "sonner";

// const Card = (data) => {

//     const [favorite, setFavorite] = useState("")

//     const {dataState, dataDispatch} = useContextoGlobal()

//     const addFav = () => {

//         if (!dataState.favs.includes(data.data) ){
//             dataDispatch({type: 'LIKE', payload: data.data})
//             console.log(data.data)
//             setFavorite("like")
//             toast.success('Producto agregado a favoritos')

//         }
//         else {

//             dataDispatch({type: 'DISLIKE', payload: data.data})
//             setFavorite("dislike")
//         }

//         }

//     return (
//         <div className={styles.cardItem}>
//             {/* {console.log(data.data.imagenes[0].urlImagen)} */}
//             <img src={data.data.imagenes[0].urlImagen} />
//                 <div>
//                     <h6
//                         style={{ textTransform: "uppercase", width: "fit-content" }}
//                     >
//                         {data.data.nombre}

//                     </h6>

//                     <p>${data.data.precio}</p>

//                     <Link to={`/product/` + data.data.idProducto}>
//                         <button className={styles.detalleBoton}>detalle</button>
//                     </Link>

//                     <button onClick={addFav} className={styles.favBoton}>{favorite === 'like' ? <StarIcon style={{color: "#E3CE8D"}}/> : <StarIcon style={{color:"gray"}}/>}</button>

//                 </div>
//         </div>
//     )
// }

// export default Card

// -------------------------------------------------------------------------------------

//SOLUCION TEMPORAL LUCA =>

const Card = ({ data }) => {
  const [favorite, setFavorite] = useState("");
  const { dataState, dataDispatch } = useContextoGlobal();

  const addFav = () => {
    if (!dataState.favs.includes(data)) {
      dataDispatch({ type: "LIKE", payload: data });
      console.log(data);
      setFavorite("like");
      toast.success("Producto agregado a favoritos");
    } else {
      dataDispatch({ type: "DISLIKE", payload: data });
      setFavorite("dislike");
    }
  };
  const imagenesOrdenadas = data.imagenes
    ? [...data.imagenes].sort((a, b) => a.idImagen - b.idImagen)
    : [];

  // const imageUrl = data?.imagenes?.[0]?.urlImagen || "";

  const imageUrl = imagenesOrdenadas[0].urlImagen;
  //console.log(imagenesOrdenadas);

  return (
    <div className={styles.cardItem}>
      {/* <img src={imageUrl} alt={data.nombre} /> */}
      <div className={styles.datosItem}>
        <h6 style={{ textTransform: "uppercase", width: "fit-content" }}>
          {data.nombre}
        </h6>
        <p style={{ margin: "0" }}>${data.precio}</p>
        <div className={styles.detalleFav}>
          <Link to={`/product/` + data.idProducto}>
            <button className={styles.detalleBoton}>detalle</button>
          </Link>
          <button onClick={addFav} className={styles.favBoton}>
            {favorite === "like" ? (
              <StarIcon style={{ color: "#E3CE8D" }} />
            ) : (
              <StarIcon style={{ color: "gray" }} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
