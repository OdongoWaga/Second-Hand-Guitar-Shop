import { combineReducers } from 'redux';
import user from './user';
import products from './products';
import site from './site';

const rootReducer = combineReducers({
  user,
  products,
  site,
});

export default rootReducer;
