import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { routes } from "./Routes/routes";
import Layout from "./Components/Layout";
import Home from "./Components/Home/Home";
import Detail from "./Components/ProductDetail/Detail";
import NotFound from "./Routes/NotFound";
import { Admin } from "./Components/Admin/Admin";
import { ListaProductos } from "./Components/Admin/ListaProductos";
import { AñadirProducto } from "./Components/Admin/AñadirProducto";
import Registro from "./Components/Registro/Registro";
import { AddCategorias } from "./Components/Admin/AddCategorias";
import { AddTalles } from "./Components/Admin/AddTalles";
import Login from "./Components/Login/Login";
import { EditarProducto } from "./Components/Admin/EditarProducto";
import { ImgCategoria } from "./Components/Admin/ImgCategoria";
import { ListarCategorias } from "./Components/Admin/ListarCategorias";
import { Categorias } from "./Components/Admin/Categorias";
import { EditarCategorias } from "./Components/Admin/EditarCategorias";
import { AddImages } from "./Components/Admin/AddImages";
import { Producto } from "./Components/Admin/Producto";
import { Caracteristicas } from "./Components/Admin/Caracteristicas";
import Favs from "./Components/Favs/Favs";
import CategoriaFiltro from "./Components/CategoriasFiltro/CategoriaFiltro";
import ListaTalles from "./Components/Admin/ListaTalles";
import Reserva from "./Components/Reserva/Reserva";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.detail} element={<Detail />} />
          <Route path={routes.notFound} element={<NotFound />} />
          <Route path={routes.admin} element={<Admin />} />
          <Route path={routes.producto} element={<Producto />} />
          <Route path={routes.listaProductos} element={<ListaProductos />} />
          <Route path={routes.añadirProducto} element={<AñadirProducto />} />
          <Route path={routes.addImages} element={<AddImages />} />
          <Route path={routes.categorias} element={<Categorias />} />
          <Route path={routes.caracteristicas} element={<Caracteristicas />} />

          <Route path={routes.añadirCategorias} element={<AddCategorias />} />
          <Route path={routes.imgCategoria} element={<ImgCategoria />} />
          <Route
            path={routes.listarCategorias}
            element={<ListarCategorias />}
          />
          <Route
            path={routes.editarCategorias}
            element={<EditarCategorias />}
          />
          <Route path={routes.añadirTalles} element={<AddTalles />} />
          <Route path={routes.listaTalles} element={<ListaTalles />} />
          <Route path={routes.editarProducto} element={<EditarProducto />} />
          <Route path={routes.registro} element={<Registro />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.favs} element={<Favs />} />
          <Route path={routes.categoria} element={<CategoriaFiltro />} />
          <Route path={routes.reserva} element={<Reserva/>}/>

        </Route>
      </Routes>
    </>
  );
}

export default App;
