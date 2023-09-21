/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContextoGlobal } from "../GlobalContext";
import styles from "./Card.module.css";

const Card = ({ data }) => {
  const [favorite, setFavorite] = useState("");
  const { dataState, dataDispatch } = useContextoGlobal();

  const addFav = () => {
    if (!dataState.favs.includes(data)) {
      dataDispatch({ type: "LIKE", payload: data });
      setFavorite("like");
      toast.success("Producto agregado a favoritos");
    } else {
      dataDispatch({ type: "DISLIKE", payload: data });
      setFavorite("dislike");
    }
  };

  const imageUrl =
    data.imagenes && data.imagenes[0] ? data.imagenes[0].urlImagen : "";

  return (
    <div className={styles.cardItem}>
      <img src={imageUrl} alt={data.nombre} />
      <div className={styles.datosItem}>
        <h6 style={{ textTransform: "uppercase", width: "fit-content" }}>
          {data.nombre}
        </h6>
        <p style={{ margin: "0" }}>${data.precio}</p>
        <div className={styles.detalleFav}>
          <Link to={`/product/${data.idProducto}`}>
            <button className={styles.detalleBoton}>Detalle</button>
          </Link>
          <button onClick={addFav} className={styles.favBoton}>
            {favorite === "like" ? (
              <FavoriteIcon style={{ color: "#E3CE8D" }} />
            ) : (
              <FavoriteBorderIcon style={{ color: "gray" }} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
