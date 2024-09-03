// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <Nav>
      {/* <NavLink to="/">Dashboard</NavLink> */}
      <NavLink to="/orders">Orders</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/add-category">Add Category</NavLink>
      <NavLink to="/add-subcategory">Add Subcategory</NavLink>
      {/* <NavLink to="/add-product">Add Product</NavLink> */}
    </Nav>
  );
};

const Nav = styled.nav`
  background: #333;
  padding: 1rem;
  color: #fff;
  display: flex;
  justify-content: space-around;
  flex-shrink: 0; /* Ensure Navbar does not shrink */
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

export default Navbar;
