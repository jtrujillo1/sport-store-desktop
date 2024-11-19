import React, { useEffect, useState } from "react";
import SalesReport from "../components/SalesReport";

const SalesReportPage = () => {
  const [salesReport, setSalesReport] = useState(null);

  useEffect(() => {
    // Función para obtener el informe de ventas
    const fetchSalesReport = async () => {
      const report = await SalesReport();
      setSalesReport(report);
    };

    fetchSalesReport();
  }, []);

  // Condicional para mostrar el cargando mientras se obtiene el informe
  if (salesReport === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Informe de Ventas</h1>
      <div>{salesReport}</div>
    </div>
  );
};

export default SalesReportPage;
