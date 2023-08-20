import {Request, Response} from "express"
import users, {IUser} from "../models/users";
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
  
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const AllUsers = await users.find({});
        res.json(AllUsers);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving users' });
    } 
}

export const getUserByID = async (req: Request, res: Response) => {
    try {
        const Users = await users.findById(req.params.id);
        res.json(Users)
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving User' });
    }
}

export const Login = async (req: Request, res: Response) => {
    const {Email, Password} = req.body;
    console.log(req.body);
    const user = await users.findOne({Email}).exec();
    if (!user) {
        res.json({ error: "Account doesn't exist" });
      } else {
        bcrypt.compare(Password, user.Password).then((match) => {
          if (!match) {
            res.json({ error: "Wrong Email or Password" });
          } else {
            const accessToken = sign(
              { Name: user.Name, Email: user.Email, id: user.id },
              "TopSecret"
            );
            res.json({ Token: accessToken, Name: user.Name, id: user.id });
          }
        });
      }
}

export const AddUser = async (req: Request, res: Response) => {
    try {
        const {Name, Email, Password} = req.body;
        const User = await bcrypt.hash(Password, 10).then((hash) => {
            users.create({
                Name: Name,
                Email: Email,
                Password: hash
            })
        })
        res.status(201).json(User);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding career' });
    }
}

export const UpdateUser = async (req: Request, res: Response) => {
    try {
        const User = await users.findByIdAndUpdate(req.params.id, req.body);
        res.json(User);
    } 
    catch (error){
        res.status(500).json({ error: 'An error occurred while Updating career' });
    }
}

export const DeleteUser = async (req:Request, res:Response) => {
    try {
        const User = await users.findByIdAndDelete(req.params.id);
        res.json(User);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting career' });
    }
}