// src/actions/subcategoryActions.js

import axios from 'axios';
import {
    SUBCATEGORY_LIST_REQUEST,
    SUBCATEGORY_LIST_SUCCESS,
    SUBCATEGORY_LIST_FAIL,
    SUBCATEGORY_ADD_REQUEST,
    SUBCATEGORY_ADD_SUCCESS,
    SUBCATEGORY_ADD_FAIL,
    SUBCATEGORY_REMOVE_REQUEST,
    SUBCATEGORY_REMOVE_SUCCESS,
    SUBCATEGORY_REMOVE_FAIL,
  } from '../constants/subcategoryConstants';
  import { getSubcategories, addSubcategory } from '../services/api';
  

  export const listSubcategories = () => async (dispatch) => {
    try {
      dispatch({ type: SUBCATEGORY_LIST_REQUEST });
  
      const { data } = await axios.get('https://saman-backend.onrender.com/api/v1/subcategories');
  
      dispatch({
        type: SUBCATEGORY_LIST_SUCCESS,
        payload: data.data, 
      });
    } catch (error) {
      dispatch({
        type: SUBCATEGORY_LIST_FAIL,
        payload: error.response && error.response.data.error ? error.response.data.error : error.message,
      });
    }
  };
  
  export const addNewSubcategory = (subcategoryData) => async (dispatch) => {
    try {
      dispatch({ type: SUBCATEGORY_ADD_REQUEST });
      await addSubcategory(subcategoryData);
      dispatch({ type: SUBCATEGORY_ADD_SUCCESS });
      dispatch(listSubcategories());
    } catch (error) {
      dispatch({
        type: SUBCATEGORY_ADD_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  export const removeSubcategory = (id) => async (dispatch) => {
    try {
      await axios.delete(`https://saman-backend.onrender.com/api/v1/subcategory/${id}`);
      dispatch({
        type: 'REMOVE_SUBCATEGORY_SUCCESS',
        payload: id,
      });
      dispatch(listSubcategories());
    } catch (error) {
      dispatch({
        type: 'REMOVE_SUBCATEGORY_FAIL',
        payload: error.message,
      });
    }
  };
  

  