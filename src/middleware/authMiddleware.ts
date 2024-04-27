import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

interface RequestWithUser extends Request {
    user?: User;
}

export const protect = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;  // Cast to 'any' to handle decoded type

        const userRepository = AppDataSource.getRepository(User);
        // Use findOneBy with options for selection
        const user = await userRepository.findOne({
            where: { id: decoded.userId }, // Specifying the condition
            select: ['id', 'username',] // Fields to select
        });

        if (!user) {
            return res.status(401).json({ success: false, message: 'No user found with this token' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authorized', error });
    }
};