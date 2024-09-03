// src/store.js

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Import thunk correctly
import { composeWithDevTools } from 'redux-devtools-extension';
import { categoryReducer, productReducer } from './reducers/adminReducers';
import { subcategoryAddReducer, subcategoryListReducer } from './reducers/subcategoryReducers';

// Combine your reducers into a root reducer
const rootReducer = combineReducers({
  categoryList: categoryReducer,
  productList: productReducer,
  subcategoryList: subcategoryListReducer,
  subcategoryAdd: subcategoryAddReducer,
});

// Create an array of middlewares
const middleware = [thunk];

// Create the Redux store with the root reducer, middleware, and DevTools integration
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Export the store
export default store;
