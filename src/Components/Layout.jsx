import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <div className="content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
