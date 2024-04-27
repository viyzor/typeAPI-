import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const userRepository = AppDataSource.getRepository(User);

interface AuthRequest extends Request {
    body: {
        username: string;
        password: string;
    };
}

export const register = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        const user = userRepository.create({ username, password });
        await userRepository.save(user); // Save the user to the database
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.status(201).json({ success: true, token });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user = await userRepository.findOneBy({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.status(200).json({ success: true, token });
    } catch (error) {
        next(error);
    }
};