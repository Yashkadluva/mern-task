import jwt from 'jsonwebtoken';
import { Payload } from './jwtUtils';

export const validateToken = async (req: any, res: any, next: any) => {
    const token: string = req.header("Authorization") ? req.header("Authorization").replaceAll('Bearer ', "") : null;
    if (token) {
        jwt.verify(token, 'yourSecretKey', (err: any, payload: Payload) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Invalid token' });
            } else {
                req.user = payload;
                next();
            }
        });
    } else {
        res.status(401).json({ success: false, message: 'Token is not provided' });
    }
};