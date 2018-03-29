import {  
  combineReducers,
  createStore,
} from 'redux';
import _ from 'lodash';

export const productAdded = product => ({  
  type: 'PRODUCT_ADDED',
  data: product,
});

export const productLoaded = (products) => ({  
  type: 'PRODUCT_LOADED',
  data: products
});
export const ownerLoaded = (address) => ({  
  type: 'OWNER_LOADED',
  data: address
});

// reducers.js
export const product = (state = {list: []}, action) => {  
  switch (action.type) {
    case 'PRODUCT_LOADED':
      return {list: action.data};
    case 'PRODUCT_ADDED':
      state.list.push(action.data);
      return _.assign({}, {
        list: _.concat(state.list, [action.data])
      })
    default:
      return state;
  }
};
export const user = (state = {owner: ''}, action) => {  
  switch (action.type) {
    case 'OWNER_LOADED':
      return {owner: action.data};
    default:
      return state;
  }
};

export const reducers = combineReducers({  
  product,
  user
});

// store.js
export function configureStore(initialState = {products: []}) {  
  const store = createStore(reducers, initialState);
  return store;
};

export const store = configureStore();