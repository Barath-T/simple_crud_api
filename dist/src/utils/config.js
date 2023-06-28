import dotenv from "dotenv";
dotenv.config();
const PORT = parseInt(process.env.PORT) || 3001;
const NODE_ENV = process.env.NODE_ENV;
const DB_NAME = process.env.DB_NAME;
const DB_UN = process.env.DB_UN;
const DB_PW = process.env.DB_PW;
const SECRET = process.env.SECRET;
const config = { PORT, NODE_ENV, DB_NAME, DB_UN, DB_PW, SECRET };
export default config;
//# sourceMappingURL=config.js.map