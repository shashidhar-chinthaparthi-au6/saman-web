// src/actions/authActions.js
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../constants/actionTypes';

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch('https://saman-backend.onrender.com/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (data.success) {
      dispatch({ type: LOGIN_SUCCESS, payload: data.user }); // Update user state
      localStorage.setItem('token', data.token); // Save token
      return { success: true }; // Return success status
    } else {
      dispatch({ type: LOGIN_FAIL });
      return { success: false, error: data.error };
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    return { success: false, error: 'An error occurred' };
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token'); // Remove token from local storage
  dispatch({ type: LOGOUT }); // Clear user state
};
