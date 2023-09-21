import { useEffect, useState } from "react";
import { Card, Button, ListGroup, Alert } from "react-bootstrap"; // Asegúrate de importar Alert y Button desde react-bootstrap
import { toast } from "sonner";
// import StarIcon from "@mui/icons-material/Star";
import { useContextoGlobal } from "../GlobalContext";

const Favs = () => {
  const [favs, setFavs] = useState([]);
  const { dataState, dataDispatch } = useContextoGlobal();

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favs")) || [];
    setFavs(storedFavs);
  }, []);

  const removeFav = (favorito) => {
    // Filtrar la lista de favoritos para quitar el producto seleccionado
    const updatedFavs = favs.filter(
      (item) => item.idProducto !== favorito.idProducto
    );
    setFavs(updatedFavs);
    localStorage.setItem("favs", JSON.stringify(updatedFavs));
    toast.info("Producto eliminado de favoritos");
  };

  return (
    <div>
      <h2>Productos Favoritos</h2>

      {favs.length === 0 ? (
        <Alert variant="warning">
          No hay productos favoritos.{" "}
          <Button 
          style={{
            width: "10%",
            backgroundColor: "#2b2b28",
            border: "none",
            color: "#efeeee",
          }} 
          href="/">
            Ir al Home
          </Button>
        </Alert>
      ) : (
        <ListGroup>
          {favs.map((favorito, index) => (
            <ListGroup.Item key={index}>
              <Card>
                <Card.Body>
                  <Card.Text>Nombre: {favorito.nombre}</Card.Text>
                  <Card.Text>Precio: $ {favorito.precio}</Card.Text>
                  <Card.Text>Descripcion: {favorito.detalle}</Card.Text>
                  <img
                    src={favorito.imagenes?.[0]?.urlImagen || ""}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  />
                  <Button variant="danger" onClick={() => removeFav(favorito)}>
                    Quitar de favoritos
                  </Button>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Favs;
