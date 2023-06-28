import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";
import User from "../models/User.js";
const userRouter = express.Router();
userRouter.get("/", async (_req, res) => {
    const data = await User.findAll({ attributes: {
            exclude: ["passwordhash"]
        } });
    return res.send(data);
});
userRouter.post("/", async (req, res) => {
    if (!decodeToken(req, res)) {
        return res.status(401).json({ error: "token not valid or expired" });
    }
    const { name, password } = req.body;
    const passwordhash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, passwordhash });
    return res.status(201).send(newUser);
});
userRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const decodedToken = decodeToken(req, res);
    if (!decodedToken) {
        return res.status(401).json({ error: "token not valid or expired" });
    }
    const { name } = req.body;
    if (!name) {
        return res.status(200).json({ body: "no data to update" });
    }
    const updatedUser = await User.update({ name }, { where: { id } });
    return res.status(204).send(updatedUser);
});
userRouter.delete("/:id", async (req, res) => {
    if (!decodeToken(req, res)) {
        return res.status(401).json({ error: "token not valid or expired" });
    }
    const { id } = req.params;
    await User.destroy({ where: { id } });
    return res.status(204).end();
});
export default userRouter;
export function getToken(req) {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7);
    }
    return null;
}
export function decodeToken(req, res) {
    const token = getToken(req);
    if (!token) {
        return res.status(401).json({ error: "no token found" });
    }
    const decodedToken = jwt.verify(token, config.SECRET);
    return decodedToken;
}
//# sourceMappingURL=user.js.map