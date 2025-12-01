import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MenuPage } from './pages/Menu';
import { CartPage } from './pages/Cart';
import { AdminPage } from './pages/Admin';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AuthPage } from './pages/Auth';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          {/* Admin Route - No Layout */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Public Routes - With Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/menu" element={<Layout><MenuPage /></Layout>} />
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/auth" element={<Layout><AuthPage /></Layout>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;