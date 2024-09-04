// src/actions/adminActions.js
import axios from 'axios';
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_SUCCESS,
  SUBCATEGORY_LIST_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
} from '../constants/adminConstants';

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const { data } = await axios.get('https://saman-backend.onrender.com/api/v1/categories');

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listSubcategories = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_LIST_REQUEST });

    const { data } = await axios.get(`https://saman-backend.onrender.com/api/v1/subcategories/${categoryId}`);

    dispatch({ type: SUBCATEGORY_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const addProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_ADD_REQUEST });
  
      const { data } = await axios.post('https://saman-backend.onrender.com/api/v1/product', productData);
  
      dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_ADD_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  
