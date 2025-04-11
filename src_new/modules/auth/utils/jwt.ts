import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

interface GenerateTokenPayload {
    sub: string;
    role: string;
}

export const generateToken = ({sub, role}: GenerateTokenPayload) => {
    return jwt.sign({sub, role}, JWT_SECRET, {expiresIn: '30d'});
};
