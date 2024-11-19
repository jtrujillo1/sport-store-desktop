import React, { useEffect, useState } from "react";

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch("http://localhost:3000/sales");
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>ID Producto</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale) => (
          <tr key={sale.id}>
            <td>{sale.id}</td>
            <td>{new Date(sale.date).toLocaleDateString("es-CO")}</td>
            <td>{sale.product_id}</td>
            <td>{sale.quantity}</td>
            <td>
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
              }).format(sale.total)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesReport;
