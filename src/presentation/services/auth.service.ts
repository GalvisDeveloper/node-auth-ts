import { UserModel } from '../../data';
import { SignUpDto } from '../../domain/dtos/auth/signUp.dto';
import { CustomError } from '../../domain/errors';
import { UserEntity } from '../../domain/entities/user';


export class AuthService {
    constructor(

    ) { }

    public async signUp(signUpDto: SignUpDto) {
        const existUser = await UserModel.findOne({ email: signUpDto.email });

        if (existUser) throw { message: 'User already exists', code: 400 };

        try {
            const user = new UserModel(signUpDto);
            await user.save();

            // Encrypted password
            // const salt = await bcrypt.genSalt(10);
            // user.password = await bcrypt.hash(signUpDto.password, salt);

            const userEntity = UserEntity.fromObject(user);

            const { password, ...rest } = userEntity;

            return { message: 'User registered successfully', data: { user: rest, token: 'abc' } };
        } catch (error) {
            throw { message: `${error}`, code: 500 };
        }
    }
}