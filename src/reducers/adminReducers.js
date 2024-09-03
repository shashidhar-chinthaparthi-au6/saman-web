// src/reducers/adminReducers.js
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
  
  export const categoryReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST:
        return { loading: true, categories: [] };
      case CATEGORY_LIST_SUCCESS:
        return { loading: false, categories: action.payload };
      case CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload, categories: [] };
      default:
        return state;
    }
  };
  
  export const productReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_ADD_REQUEST:
        return { loading: true };
      case PRODUCT_ADD_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_ADD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  