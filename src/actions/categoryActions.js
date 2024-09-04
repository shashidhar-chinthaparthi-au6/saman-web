// actions/categoryActions.js

import axios from 'axios';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  REMOVE_CATEGORY_REQUEST,
  REMOVE_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_FAILURE
} from '../constants/categoryConstants';

// Fetch Categories
export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    const { data } = await axios.get('https://saman-backend.onrender.com/api/v1/categories');
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
    return data; // Return data to use in the component
  } catch (error) {
    dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message });
    throw error; // Rethrow to handle in the component
  }
};

// Add Category
export const addCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CATEGORY_REQUEST });
    const { data } = await axios.post('https://saman-backend.onrender.com/api/v1/category', category);
    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_CATEGORY_FAILURE, payload: error.message });
    throw error; // Rethrow to handle in the component
  }
};

// Remove Category
export const removeCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CATEGORY_REQUEST });
    await axios.delete(`https://saman-backend.onrender.com/api/v1/category/${categoryId}`);
    dispatch({ type: REMOVE_CATEGORY_SUCCESS, payload: categoryId });
  } catch (error) {
    dispatch({ type: REMOVE_CATEGORY_FAILURE, payload: error.message });
    throw error; // Rethrow to handle in the component
  }
};
