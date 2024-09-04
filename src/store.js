// src/store.js

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
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

// Setup Redux DevTools manually with a fallback for non-development environments
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Create the Redux store with the root reducer, middleware, and DevTools integration
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

// Export the store
export default store;
