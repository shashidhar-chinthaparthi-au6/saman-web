// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import store from './store';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Orders from './components/Orders';
import AddCategory from './components/AddCategory';
import AddSubcategory from './components/AddSubcategory';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Navbar />
          <MainContent>
            <Routes>
              <Route path="/" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/add-subcategory" element={<AddSubcategory />} />
              <Route path="/add-product" element={<AddProduct />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </Provider>
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
