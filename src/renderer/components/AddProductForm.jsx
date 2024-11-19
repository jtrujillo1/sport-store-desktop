import React, { useState } from "react";

const AddProductForm = ({ onAddProduct, loading, error }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !price || !stock) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (isNaN(price) || isNaN(stock) || price <= 0 || stock <= 0) {
      alert("El precio y la cantidad deben ser números positivos.");
      return;
    }

    onAddProduct({ name, description, price, stock });
  };

  return (
    <form id="add-product-form" onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="product-name">Nombre del Producto</label>
        <input
          type="text"
          id="product-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Balón de Fútbol"
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="product-description">Descripción</label>
        <textarea
          id="product-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ej: Balón de cuero tamaño 5"
          style={styles.textarea}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="product-price">Precio (COP)</label>
        <input
          type="number"
          id="product-price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          placeholder="Ej: 120000"
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="product-stock">Cantidad en Stock</label>
        <input
          type="number"
          id="product-stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
          placeholder="Ej: 50"
          required
          style={styles.input}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{ ...styles.button, ...(loading && styles.buttonDisabled) }}
      >
        {loading ? "Cargando..." : "Agregar Producto"}
      </button>
      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
};

// Estilos
const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop: "5px",
  },
  textarea: {
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop: "5px",
    resize: "none",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonDisabled: {
    backgroundColor: "#A0A0A0",
    cursor: "not-allowed",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default AddProductForm;
