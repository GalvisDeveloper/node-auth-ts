
import jwt from 'jsonwebtoken';

export class JwtAdapter {


    static generateToken(payload: any, secret: string, expiresIn: string = '2h') {

        return new Promise((resolve, reject) => {
            jwt.sign(payload, secret, { expiresIn }, (err, token) => {
                if (err) return reject(err);
                resolve(token);
            });
        });
    }

    static verifyToken(token: string): any {
        return { id: 'id' };
    }
}

// export const jwtAdapter = {
//     sign: async (payload: any, secret: string, expiresIn: string): Promise<string> => {
//         return 'token';
//     },
//     verify: async (token: string, secret: string): Promise<any> => {
//         return { id: 'id' };
//     }
// }