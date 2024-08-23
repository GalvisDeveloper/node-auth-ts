import { UserModel } from '../../data';
import { SignUpDto } from '../../domain/dtos/auth/signUp.dto';
import { CustomError } from '../../domain/errors';
import { UserEntity } from '../../domain/entities/user';
import bcrypt from 'bcryptjs';
import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { SignInDto } from '../../domain/dtos/auth/signIn.dto';


export class AuthService {
    constructor(

    ) { }

    public async signUp(signUpDto: SignUpDto) {
        //Verify if user exists
        const existUser = await UserModel.findOne({ email: signUpDto.email });

        if (existUser) throw { message: 'User already exists', code: 400 };

        try {
            // Model instance
            const user = new UserModel(signUpDto);

            // Encrypted password
            user.password = await bcryptAdapter.hash(signUpDto.password);

            // Save user
            await user.save();

            // Entity instance
            const userEntity = UserEntity.fromObject(user);

            // Return user without password
            const { password, ...rest } = userEntity;

            return { message: 'User registered successfully', data: { user: rest, token: 'abc' } };
        } catch (error) {
            throw { message: `${error}`, code: 500 };
        }
    }

    public async signIn(signInDto: SignInDto) {
        const user = await UserModel.findOne({ email: signInDto.email });
        if (!user) throw { message: 'User not registered', code: 404 };

        try {
            // compare password
            const isPasswordValid = await bcryptAdapter.compare(signInDto.password, user.password);
            if (!isPasswordValid) throw { message: 'Invalid password', code: 401 };

            const userEntity = UserEntity.fromObject(user);

            const { password, ...rest } = userEntity;

            return { data: { user: rest, token: 'abc' } };
        } catch (err) {
            throw { message: `${err}`, code: 500 };
        }

    }
}