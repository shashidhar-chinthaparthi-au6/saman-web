// reducers/categoryReducer.js

import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    REMOVE_CATEGORY_REQUEST,
    REMOVE_CATEGORY_SUCCESS,
    REMOVE_CATEGORY_FAILURE,
  } from '../constants/categoryConstants';
  
  const initialState = {
    categories: [],
    loading: false,
    error: null,
  };
  
  export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CATEGORIES_REQUEST:
        return { ...state, loading: true };
      case FETCH_CATEGORIES_SUCCESS:
        return { ...state, loading: false, categories: action.payload };
      case FETCH_CATEGORIES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case ADD_CATEGORY_REQUEST:
      case REMOVE_CATEGORY_REQUEST:
        return { ...state, loading: true };
      case ADD_CATEGORY_SUCCESS:
      case REMOVE_CATEGORY_SUCCESS:
        return { ...state, loading: false };
      case ADD_CATEGORY_FAILURE:
      case REMOVE_CATEGORY_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  