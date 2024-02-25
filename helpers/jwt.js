import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET_KEY || "egelFHE&*sfalk@!@&!GJAafgafa";

export const generateToken = (payload) => {
    return jwt.sign(payload, secret, {expiresIn: '1h'});
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return 'Invalid token';
    }
};