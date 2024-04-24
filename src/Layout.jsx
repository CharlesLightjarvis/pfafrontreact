import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar"; // Vérifiez le chemin d'accès
import Breadcrumb from "./Breadcrumb"; // Assurez-vous que le chemin est correct

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "20px", marginTop: "70px" }}>
        {/* <Breadcrumb /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
