import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OrderPage } from './pages/OrderPage';
import { JobPage } from './pages/JobPage';
import ScrollToHash from "./pages/ScrollToHash";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <ScrollToHash />
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/career" element={<JobPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

