import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 60*5;

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: +JWT_EXPIRES_IN
  });
};

export const verifyToken = (token: string): string | JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    // console.error('Error verifying token:', error);
     throw error;
  }
};