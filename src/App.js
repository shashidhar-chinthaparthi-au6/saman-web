// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Orders from './components/Orders';
import Products from './components/Products';
import AddCategory from './components/AddCategory';
import AddSubcategory from './components/AddSubcategory';
import AddProduct from './components/AddProduct';
import Login from './pages/Login';
import styled from 'styled-components';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const user = useSelector((state) => state.user.user); // Adjust path if necessary

  return (
    <Router>
      <AppContainer>
        {user && <Navbar />}
        <MainContent>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<ProtectedRoute component={Orders} />} />
            <Route path="/products" element={<ProtectedRoute component={Products} />} />
            <Route path="/add-category" element={<ProtectedRoute component={AddCategory} />} />
            <Route path="/add-subcategory" element={<ProtectedRoute component={AddSubcategory} />} />
            <Route path="/add-product" element={<ProtectedRoute component={AddProduct} />} />
            <Route path="*" element={<Navigate to="/orders" replace />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f8f9fa;
`;
