import jwt from 'jsonwebtoken';

export type Payload = {
    userId: string;
    email: string;
};

export const generateToken = (payload: Payload) => {
    const secretKey = 'yourSecretKey'; // Replace with your own secret key
    const options = { expiresIn: '24h' };

    const token: string = jwt.sign(payload, secretKey, options);
    return token;
};