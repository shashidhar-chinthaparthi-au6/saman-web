// src/reducers/subcategoryReducers.js

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
  
  const initialState = {
    subcategories: [],
    loading: false,
    error: null,
  };
  
  export const subcategoryListReducer = (state = initialState, action) => {
    switch (action.type) {
      case SUBCATEGORY_LIST_REQUEST:
        return { ...state, loading: true };
      case SUBCATEGORY_LIST_SUCCESS:
        return { loading: false, subcategories: action.payload, error: null };
      case SUBCATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload };
      case SUBCATEGORY_REMOVE_REQUEST:
        return { ...state, loading: true };
      case SUBCATEGORY_REMOVE_SUCCESS:
        return {
          ...state,
          loading: false,
          subcategories: state.subcategories.filter(
            (subcat) => subcat._id !== action.payload
          ),
          error: null,
        };
      case SUBCATEGORY_REMOVE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const subcategoryAddReducer = (state = {}, action) => {
    switch (action.type) {
      case SUBCATEGORY_ADD_REQUEST:
        return { loading: true };
      case SUBCATEGORY_ADD_SUCCESS:
        return { loading: false, success: true };
      case SUBCATEGORY_ADD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  