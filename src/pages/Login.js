import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)({
  display: 'flex',
  height: '100vh', // Full viewport height
  width: '100vw', // Full viewport width
  padding: 0,
  margin: 0,
  backgroundColor: '#000', // Black background
  overflow: 'hidden', // Hide any overflow
  maxWidth: 'none' // Remove max-width
});

const LeftPanel = styled(Box)({
  backgroundColor: '#111', // Slightly lighter black for contrast
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '32px',
  width: '50vw', // Adjust to half the viewport width
  height: '100%', // Ensure it takes full height
  backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))',
});

const RightPanel = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50vw', // Adjust to half the viewport width
  height: '100%', // Ensure it takes full height
  backgroundColor: 'black', // Platinum grey background
});

const LoginPaper = styled(Paper)({
  padding: '32px',
  maxWidth: 400,
  width: '100%',
  textAlign: 'center',
  boxShadow: '0px 0px 20px 10px rgba(0, 0, 255, 0.7)', // Glowing blue shadow
  backgroundColor: '#1f1f1f', // Dark grey background for the login card
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
      .then((response) => {
        if (response.success) {
          navigate('/orders');
        } else {
          alert(response.error);
        }
      });
  };

  return (
    <StyledContainer>
      <LeftPanel>
        <Typography variant="h2" gutterBottom>
          Welcome to Saman App
        </Typography>
        <Typography variant="body1" paragraph>
          Manage your e-commerce store with ease. Access comprehensive tools for product management, order tracking, and customer support. Get started with a sleek, intuitive admin interface.
        </Typography>
      </LeftPanel>
      <RightPanel>
        <LoginPaper>
          <Typography variant="h4" gutterBottom color="primary">
            Admin Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{ style: { color: '#fff' } }} // White text for input fields
              InputLabelProps={{ style: { color: '#fff' } }} // White label text
              style={{ backgroundColor: '#333' }} // Dark background for input fields
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{ style: { color: '#fff' } }}
              InputLabelProps={{ style: { color: '#fff' } }}
              style={{ backgroundColor: '#333' }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              style={{ marginTop: '16px', backgroundColor: '#f50057' }} // Pink color for the button
            >
              Login
            </Button>
          </form>
        </LoginPaper>
      </RightPanel>
    </StyledContainer>
  );
};

export default Login;
