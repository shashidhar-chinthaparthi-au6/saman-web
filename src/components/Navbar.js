import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <Nav>
      <NavLink to="/orders">Orders</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/add-category">Add Category</NavLink>
      <NavLink to="/add-subcategory">Add Subcategory</NavLink>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Nav>
  );
};

const Nav = styled.nav`
  background: #333;
  padding: 1rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0; /* Ensure Navbar does not shrink */
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right: 1rem;
`;

const LogoutButton = styled.button`
  background: #e74c3c;
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #c0392b;
  }
`;

export default Navbar;
