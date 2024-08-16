

export class SignInDto {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(object: { [key: string]: string }): [string?, SignInDto?] {
        const { email, password } = object;
        if (!email) return ['email is required'];
        if (!password) return ['password is required'];
        return [undefined, new SignInDto(email, password)];
    }
}