import { injectable, inject } from 'tsyringe';

import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/iUsersRepository';

import User from '../infra/typeorm/entities/User';


@injectable()
class ShowUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(): Promise<User[]> {
        const users = await this.usersRepository.find();

        return users;
    }
}

export default ShowUsersService;
