import dotenv from 'dotenv';
dotenv.config();

export const URLS = {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  marvelPublicKey: process.env.MARVEL_PUBLIC_KEY,
  marvelPrivateKey: process.env.MARVEL_PRIVATE_KEY,
  marvelUrl: process.env.MARVEL_URL,
};
