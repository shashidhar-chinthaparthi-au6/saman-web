// src/store.js

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { categoryReducer, productReducer } from './reducers/adminReducers';
import { subcategoryAddReducer, subcategoryListReducer } from './reducers/subcategoryReducers';
import userReducer from './reducers/userReducer';

// Combine your reducers into a root reducer
const rootReducer = combineReducers({
  user: userReducer,
  categoryList: categoryReducer,
  productList: productReducer,
  subcategoryList: subcategoryListReducer,
  subcategoryAdd: subcategoryAddReducer,
});

// Create an array of middleware
const middleware = [thunk];

// Create the Redux store with the root reducer and middleware only
const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

// Export the store
export default store;
