import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../utils/config.js";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.get("/", async(_req: Request, res: Response)=>{
    const data = await User.findAll({attributes: {
        exclude: ["passwordhash"]
    }});
    return res.send(data);
});

userRouter.post("/", async(req: Request, res: Response)=>{
    if(!decodeToken(req, res)){
        return res.status(401).json({error: "token not valid or expired"});
    }
    const {name, password}: ReqBody = req.body;
    const passwordhash = await bcrypt.hash(password, 10);

    const newUser = await User.create({name, passwordhash});

    return res.status(201).send(newUser);
});

userRouter.put("/:id", async(req: Request, res: Response)=>{
    const {id} = req.params;

    const decodedToken = decodeToken(req, res);
    if(!decodedToken){
        return res.status(401).json({error: "token not valid or expired"});
    }
    const {name} = req.body;
    if(!name){
        return res.status(200).json({body: "no data to update"});
    }
    const updatedUser = await User.update({name}, {where: {id}});
    return res.status(204).send(updatedUser);
});


userRouter.delete("/:id", async(req: Request, res: Response)=>{
    if(!decodeToken(req, res)){
        return res.status(401).json({error: "token not valid or expired"});
    }
    const {id} = req.params;

    await User.destroy({where:{id}});
    return res.status(204).end();
});


export default userRouter;

interface ReqBody{
    name: string,
    password: string
}

export function getToken(req: Request): string{
    const authorization = req.get("authorization");
    if(authorization && authorization.toLowerCase().startsWith("bearer ")){
        return authorization.substring(7);
    }

    return null;
}
export function decodeToken(req: Request, res: Response): string | jwt.JwtPayload{
    const token: string = getToken(req);
    if(!token){
        return res.status(401).json({error: "no token found"});
    }
    const decodedToken: string | jwt.JwtPayload = jwt.verify(token, config.SECRET);
    return decodedToken;
}