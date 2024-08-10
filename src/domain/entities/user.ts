import { CustomError } from "../errors";


export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string, // Optional fields should be declared at the end
    ) { }


    static fromObject(obj: { [key: string]: any }): UserEntity {
        const { id, _id, name, email, emailValidated, password, role, img } = obj;

        if (!id && !_id) {
            throw CustomError.badRequest('Missing id');
        }

        const missingFields = [];

        if (!name) missingFields.push('name');
        if (!email) missingFields.push('email');
        if (emailValidated === undefined) missingFields.push('emailValidated');
        if (!password) missingFields.push('password');
        if (!role) missingFields.push('role');

        if (missingFields.length > 0) {
            throw CustomError.badRequest(`Missing required fields: ${missingFields.join(', ')}`);
        }

        return new UserEntity(
            _id || id,
            name,
            email,
            emailValidated,
            password,
            role,
            img
        )
    }
}