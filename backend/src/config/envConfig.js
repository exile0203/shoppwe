import dotenv from 'dotenv';

dotenv.config();

export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_SECRET = process.env.CLOUD_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;