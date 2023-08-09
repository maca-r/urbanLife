import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { routes } from "./Routes/routes";
import Layout from "./Components/Layout";
import Home from "./Components/Home/Home";
import Detail from "./Components/ProductDetail/Detail";
import NotFound from "./Routes/NotFound";
import Admin from "./Components/Admin/Admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.detail} element={<Detail />} />
          <Route path={routes.notFound} element={<NotFound />} />
          <Route path={routes.admin} element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
