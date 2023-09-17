import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { toast } from "sonner";
import StarIcon from "@mui/icons-material/Star";
import { useContextoGlobal } from "../GlobalContext";

const Favs = () => {
  console.log(localStorage.getItem("favs"));
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favs")) || [];
    setFavs(storedFavs);
  }, []);

  const [favorite, setFavorite] = useState("");
  const { dataState, dataDispatch } = useContextoGlobal();

  // const addFav = (favorito) => {
  //     if (!dataState.favs.includes(favorito)) {
  //         dataDispatch({ type: "LIKE", payload: favorito });
  //         console.log(favorito);
  //         setFavorite("like");
  //         toast.success("Producto agregado a favoritos");
  //     } else {
  //         dataDispatch({ type: "DISLIKE", payload: favorito });
  //         setFavorite("dislike");
  //     }
  // };

  const imageUrl = favs.imagenes?.[0]?.urlImagen || "";

  return (
    <div>
      <h2>Productos Favoritos</h2>

      {favs.map((favorito, index) => (
        <ul key={index}>
          <li
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2%",
            }}
          >
            <p>ID del Producto: {favorito.idProducto}</p>
            <p>Nombre: {favorito.nombre}</p>
            <p>Precio: $ {favorito.precio}</p>
            {/* <p>Imágenes: {imageUrl}</p> */}
            <img style={{ maxWidth: "100px" }} src={imageUrl} alt="" />
            {/* <button onClick={addFav(favorito)}>
                    {favorite === "like" ? (
                        <StarIcon style={{ color: "#E3CE8D" }} />
                    ) : (
                        <StarIcon style={{ color: "gray" }} />
                    )}
        </button> */}
          </li>
        </ul>

        //     // <Card key={index} data={favorito}></Card>
      ))}
    </div>
  );
};

export default Favs;
