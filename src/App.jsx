import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductGrid from './project/ProductGrid';
import './index.css';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Container style={{ flex: 1, overflowY: 'auto', paddingBottom: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-grid" element={<ProductGrid />} />
          {/* Add more routes for other projects */}
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;