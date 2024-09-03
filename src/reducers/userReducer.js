// src/reducers/userReducer.js
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../constants/actionTypes';

// Initial state
const initialState = {
  user: null,
  error: null,
};

// User reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
