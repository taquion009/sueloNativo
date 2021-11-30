import React, { createContext, useReducer, useEffect } from 'react';
import { addToCart, removeFromCart, emptyCart, getCart, UpdateQuantityCart } from './use-local-storage';
import { INIT_CART, ADD_CART, DELETE_ITEM_CART, CLEAR_CART, UPDATE_QUANTITY } from './actions';

const initialState = {
  cart: [],
};

const store = createContext(initialState);
const { Provider } = store;

const cartReducer = (state, action) => {
  switch (action.type) {
    case INIT_CART:
      return {...state, cart:[...state.cart,...getCart()] }
    case ADD_CART:
      addToCart(action.payload)
    break;
    case UPDATE_QUANTITY:
      UpdateQuantityCart(action.payload)
    break;
    case DELETE_ITEM_CART:
      removeFromCart(action.payload)
    break;
    case CLEAR_CART:
      emptyCart()
    break;
    default:
      throw new Error('Wrong Action Type: ' + action.type);
  }
  return{
    ...state,
    cart:getCart()
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    dispatch({
      type: INIT_CART,
    });
  }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
