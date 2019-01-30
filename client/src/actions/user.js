import axios from 'axios';

import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
  UPDATE_DATA_USER,
  CLEAR_UPDATE_DATA_USER,
} from './types';
import { USER_SERVER, PRODUCT_SERVER } from '../utils/misc';

export const loginUser = dataToSubmit => {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const registerUser = dataToSubmit => {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export const auth = dataToSubmit => {
  const request = axios(`${USER_SERVER}/auth`).then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
};

export const logoutUser = () => {
  const request = axios(`${USER_SERVER}/logout`).then(
    response => response.data
  );

  return {
    type: LOGOUT_USER,
    payload: request,
  };
};

export const addToCart = _id => {
  const request = axios
    .post(`${USER_SERVER}/add-to-cart?productId=${_id}`)
    .then(response => response.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
};

export const getCartItems = (cartItems, userCart) => {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles-by-id?id=${cartItems}&type=array`)
    .then(response => {
      userCart.forEach(item => {
        response.data.forEach((k, i) => {
          if (item.id === k._id) {
            response.data[i].quantity = item.quantity;
          }
        });
      });

      return response.data;
    });

  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
};

export const removeCartItem = _id => {
  const request = axios
    .get(`${USER_SERVER}/remove-from-cart?_id=${_id}`)
    .then(response => {
      response.data.cart.forEach(item => {
        response.data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            response.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });

      return response.data;
    });

  return {
    type: REMOVE_CART_ITEM,
    payload: request,
  };
};

export const onSuccessBuy = data => {
  const request = axios
    .post(`${USER_SERVER}/success-buy`, data)
    .then(response => response.data);

  return {
    type: ON_SUCCESS_BUY,
    payload: request,
  };
};

export const updateDataUser = dataToSubmit => {
  const request = axios
    .post(`${USER_SERVER}/update-profile`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_DATA_USER,
    payload: request,
  };
};

export const clearUpdateUser = () => {
  return {
    type: CLEAR_UPDATE_DATA_USER,
    payload: '',
  };
};
