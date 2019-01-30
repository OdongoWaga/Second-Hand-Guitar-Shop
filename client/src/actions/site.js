import axios from 'axios';

import { GET_SITE_DATA, UPDATE_SITE_DATA } from './types';
import { SITE_SERVER } from '../utils/misc';

export const getSiteData = () => {
  const request = axios
    .get(`${SITE_SERVER}/site-info`)
    .then(response => response.data);

  return {
    type: GET_SITE_DATA,
    payload: request,
  };
};

export const updateSiteData = dataToSubmit => {
  const request = axios
    .post(`${SITE_SERVER}/site-info`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_SITE_DATA,
    payload: request,
  };
};
