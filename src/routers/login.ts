import express, {Request, Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import config from "../utils/config.js";
import User from "../models/User.js";

const loginRouter = express.Router();

loginRouter.post("/", async(req: Request, res: Response)=>{
    const {id, password}: {id: number, password: string} = req.body;


    const user: UserModel = (await User.findByPk(id))?.dataValues;
    if(!user){
        return res.status(401).json({error: "no user found with given id"});
    }
    
    const valid: boolean = await bcrypt.compare(password, user.passwordhash);

    if(!valid){
        return res.status(401).json({error: "password doesn't match"});
    }

    const token: string = jwt.sign({id: user.id, name: user.name}, config.SECRET, {expiresIn: 60*60});

    return res.status(200).send({token, name: user.name});

});

interface UserModel{
    id: number,
    name: string,
    passwordhash: string
}
export default loginRouter; 