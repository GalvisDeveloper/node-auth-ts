import { UserModel } from '../../data';
import { SignUpDto } from '../../domain/dtos/auth/signUp.dto';
import { UserEntity } from '../../domain/entities/user';
import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { SignInDto } from '../../domain/dtos/auth/signIn.dto';
import { JwtAdapter } from '../../config/jwt.adapter';
import { envs } from '../../config';
import { EmailService } from './email.service';

export class AuthService {
    constructor(
        private readonly emailService: EmailService,
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

            // Confirmation email
            await this.sendEmailValidationLink(user.email);

            // Entity instance
            const userEntity = UserEntity.fromObject(user);

            // Return user without password
            const { password, ...rest } = userEntity;

            const dataToken = { id: user.id };
            const token = await JwtAdapter.generateToken(dataToken, envs.JWT_SECRET);
            if (!token) throw { message: 'Error generating token', code: 500 };

            return { message: 'User registered successfully', data: { user: rest, token } };
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

            const dataToken = { id: user.id };
            const token = await JwtAdapter.generateToken(dataToken, envs.JWT_SECRET, 'wtryutyi');
            if (!token) throw { message: 'Error generating token', code: 500 };

            return { data: { user: rest, token } };
        } catch (err) {
            if (typeof err === 'object') throw err;
            throw { message: `${err}`, code: 500 };
        }
    }

    public async validateEmail(token: string) {
        const { email } = await JwtAdapter.verifyToken(token);
        if (!email) throw { message: 'Email not in token', code: 500 };

        const user = await UserModel.findOne({ email });
        if (!user) throw { message: 'User not found', code: 404 };

        user.emailValidated = true;
        await user.save();
    }

    private sendEmailValidationLink = async (email: string) => {

        const token = await JwtAdapter.generateToken({ email }, envs.JWT_SECRET, '1min');
        if (!token) throw { message: 'Error generating token', code: 500 };

        const link = `${envs.BASE_URL}/auth/validate-email/${token}`;

        const html = `
            <h1>Click <a href="${link}">here</a> to verify your email</h1>
            <p>It is for treidy and cristomonedas, be generous</p>
        `

        const dataToSend = {
            to: email,
            subject: 'Email verification',
            htmlBody: html
        }

        const sent = await this.emailService.sendEmail(dataToSend);
        if (!sent) throw { message: 'Error sending email', code: 500 };

    }
}