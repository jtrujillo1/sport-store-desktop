import React from "react";
import HomePage from "./renderer/pages/HomePage";
import AddProductPage from "./renderer/pages/AddProductPage";
import SalesReportPage from "./renderer/pages/SalesReportPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./renderer/components/Navbar";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/sales-report" element={<SalesReportPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
