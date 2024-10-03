import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../utils/validateEnv';


const generateToken = (id: number) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: '1h' });
};


export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;



  try {

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // JWT
    const token = generateToken(user.id);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


export const getProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    phoneNumber: user.phoneNumber,
  });
};


export const updateProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { firstName, lastName, email, dateOfBirth, gender, phoneNumber } = req.body;



  try {

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      user.email = email;
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (gender) user.gender = gender;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save()

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};