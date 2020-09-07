import User from '@modules/users/infra/typeorm/entities/User';
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth';
import AppError from '@shared/erros/AppError';
import usersRouter from './../infra/http/routes/users.routes';
import IUsersRepository from './../repositories/iUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { injectable, inject } from 'tsyringe'


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({email, password}: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return {user, token};

    }

}

export default AuthenticateUserService;
