import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 8000;
export const DB_URL = process.env.DB_URL;

export const API_VERSION = process.env.API_VERSION;

export const SECRET_KEY = process.env.SECRET_KEY;
export const TOKEN_EXPIRE_IN = process.env.TOKEN_EXPIRE_IN || '365d';

export const CLIENT_URL = process.env.CLIENT_URL;

export const STATIC_FOLDER = './public';

export const ROLE_ENUM = ['admin', 'user'];

export const TOKEN_COOKIE_NAME = 'authToken';
