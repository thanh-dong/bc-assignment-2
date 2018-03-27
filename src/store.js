import {  
  combineReducers,
  createStore,
} from 'redux';

export const productAdded = product => ({  
  type: 'PRODUCT_ADDED',
  data: product,
});

export const productLoaded = (products) => ({  
  type: 'PRODUCT_LOADED',
  data: products
});

// reducers.js
export const rootState = (state = {products: []}, action) => {  
  switch (action.type) {
    case 'PRODUCT_LOADED':
      return {
        ...state, products: action.data
      };
    case 'PRODUCT_ADDED':
      return {
        ...state, products: state.products.push(action.data)
      };
    default:
      return state;
  }
};

export const reducers = combineReducers({  
  rootState,
});

// store.js
export function configureStore(initialState = {}) {  
  const store = createStore(reducers, initialState);
  return store;
};

export const store = configureStore();