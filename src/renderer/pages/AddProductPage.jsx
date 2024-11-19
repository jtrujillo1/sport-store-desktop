import React, { useState } from "react";
import AddProductForm from "../components/AddProductForm";

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Manejar el envío de datos desde el hijo
  const handleAddProduct = async (product) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el producto");
      }

      alert("Producto agregado con éxito");
      window.location.hash = "/"; // Redirigir a la página principal
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Agregar Producto</h1>
      <AddProductForm
        onAddProduct={handleAddProduct}
        loading={loading}
        error={error}
      />
    </div>
  );
};

// Estilos para el contenedor
const styles = {
  container: {
    margin: "20px auto",
    padding: "20px",
    maxWidth: "600px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
};

export default AddProductPage;
