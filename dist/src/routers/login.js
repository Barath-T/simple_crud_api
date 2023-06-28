import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../utils/config.js";
import User from "../models/User.js";
const loginRouter = express.Router();
loginRouter.post("/", async (req, res) => {
    const { id, password } = req.body;
    const user = (await User.findByPk(id))?.dataValues;
    if (!user) {
        return res.status(401).json({ error: "no user found with given id" });
    }
    const valid = await bcrypt.compare(password, user.passwordhash);
    if (!valid) {
        return res.status(401).json({ error: "password doesn't match" });
    }
    const token = jwt.sign({ id: user.id, name: user.name }, config.SECRET, { expiresIn: 60 * 60 });
    return res.status(200).send({ token, name: user.name });
});
export default loginRouter;
//# sourceMappingURL=login.js.map