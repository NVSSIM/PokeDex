import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve('.', 'config', `.env.${process.env.NODE_ENV}`),
});

const config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    dialect: process.env.DATABASE_DIALECT
};

export default config;