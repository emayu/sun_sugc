import jwt from 'jsonwebtoken';
const { v4:uuidV4 } =  require('uuid');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = '8h';

export interface Subject {
    id: number;
    email: string;
    roles: string[];
}

/**
 * Genera un token JWT estándar para la sesión del usuario
 */
export const issueToken = (values: Subject): string => {
    const jti = uuidV4();
    const now = Math.floor(Date.now()/1000);
    const payload = {
        subId: values.id,
        email: values.email,
        roles: values.roles,
        jti,
        iat: now
    }
    return jwt.sign(payload, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: JWT_EXPIRES_IN,
    });
};



export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};