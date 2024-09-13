
import jwt from 'jsonwebtoken';
import { envs } from '../envs';

export class JwtAdapter {

    static generateToken(payload: any, secret: string, expiresIn: string = '2h') {

        return new Promise((resolve, reject) => {
            jwt.sign(payload, secret, { expiresIn }, (err, token) => {
                if (err) return reject({ message: err, code: 500 })
                resolve(token);
            });
        });
    }

    static verifyToken<T>(token: string): Promise<T|null> {

        return new Promise((resolve, reject) => {
            jwt.verify(token, envs.JWT_SECRET, (err, decoded) => {
                if (err) return reject({ message: err, code: 401 });
                resolve(decoded as T);
            });
        });

    }
}
