import React, { useState, useEffect } from "react";
import ProductTable from "../components/ProductTable";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item
        );
      } else {
        return [
          ...prevCart,
          { ...product, quantity: 1, subtotal: product.price },
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleCreateSale = async () => {
    if (cart.length === 0) {
      alert(
        "El carrito está vacío. Agrega productos antes de realizar la venta."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la venta.");
      }

      const result = await response.json();
      alert("Venta creada con éxito!");
      setCart([]); // Vaciar el carrito después de la venta
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al crear la venta.");
    }
  };

  const filteredData = data.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const products = await response.json();
        setData(products);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const total = cart.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <div className={styles["page-container"]}>
      <div className={styles["cart-container"]}>
        <div className={styles["cart-header"]}>Carrito de Compras</div>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className={styles["cart-item"]}>
              <div>
                <strong>{item.name}</strong>
                <p>
                  Cantidad: {item.quantity} - Subtotal:{" "}
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                  }).format(item.subtotal)}
                </p>
              </div>
              <button
                className={styles["remove-button"]}
                onClick={() => removeFromCart(item.id)}
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <div>No hay productos en el carrito</div>
        )}
        {cart.length > 0 && (
          <>
            <div className={styles["cart-footer"]}>
              Total:{" "}
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
              }).format(total)}
            </div>
            <button
              className={styles["create-sale-button"]}
              onClick={handleCreateSale}
            >
              Crear Venta
            </button>
          </>
        )}
      </div>
      <div className={styles["main-container"]}>
        <h1>Inventario de Productos</h1>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
        />
        <ProductTable data={filteredData} onAddToCart={addToCart} />
      </div>
    </div>
  );
};

export default HomePage;
