import { Request, Response } from 'express';
import UserModel from '../models/User';


export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Required field missing" });
    }

    const newUser = new UserModel({
      name: name,
      email: email,
      password: password
    });

    const user = await newUser.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
