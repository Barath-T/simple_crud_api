import dotenv from "dotenv";
dotenv.config();

const PORT: number = parseInt(process.env.PORT as string) || 3001;
const NODE_ENV: string = process.env.NODE_ENV;

const DB_NAME: string = process.env.DB_NAME;
const DB_UN: string = process.env.DB_UN;
const DB_PW: string = process.env.DB_PW;

const SECRET: string = process.env.SECRET;

const config = { PORT, NODE_ENV, DB_NAME, DB_UN, DB_PW, SECRET };
export default config;