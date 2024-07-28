export * as apiHandler from './apiHandler';
export * from './apiHandler';
export * from './handleCookies';
export * from './hooks';
import { SERVER_URL } from '../config';
import { COOKIE_NAMES } from '../constants';
import { removeCookie } from './handleCookies';

export const formatImageUrl = (url) => {
  if (!url) {
    return;
  }

  if (url.startsWith('https://')) {
    return url;
  }

  return `${SERVER_URL}/${url}`;
};

export const signOut = ({ setCurrentUser, navigate }) => {
  setCurrentUser(null);
  navigate('/login');

  removeCookie(COOKIE_NAMES.TOKEN);
  removeCookie(COOKIE_NAMES.USER);
};
