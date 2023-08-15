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
import Login from "./Components/Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.detail} element={<Detail />} />
          <Route path={routes.notFound} element={<NotFound />} />
          <Route path={routes.admin} element={<Admin />} />
          <Route path={routes.listaProductos} element={<ListaProductos />} />
          <Route path={routes.añadirProducto} element={<AñadirProducto />} />
          <Route path={routes.login} element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
