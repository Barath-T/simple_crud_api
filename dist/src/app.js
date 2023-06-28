import userRouter from "./routers/user.js";
import loginRouter from "./routers/login.js";
import config from "./utils/config.js";
import db from "./database.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
app.use(cors());
app.use(express.json({ limit: "10kb" }));
db
    .authenticate()
    .then(() => console.log("DB connected."))
    .catch((err) => console.log(err));
if (config.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
export default app;
//# sourceMappingURL=app.js.map