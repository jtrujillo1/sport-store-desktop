import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
        background: "#007bff",
        color: "white",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Inicio
      </Link>
      <Link
        to="/add-product"
        style={{ color: "white", textDecoration: "none" }}
      >
        Agregar Producto
      </Link>
      <Link
        to="/sales-report"
        style={{ color: "white", textDecoration: "none" }}
      >
        Informe de Ventas
      </Link>
    </nav>
  );
};

export default Navbar;
