import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../utils/validateEnv';
import User, { UserAttributes } from '../models/User';

interface AuthRequest extends Request {
    user?: UserAttributes;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as { id: number };

        const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });

        if (!user) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default auth;