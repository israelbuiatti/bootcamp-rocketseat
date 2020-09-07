import User from '@modules/users/infra/typeorm/entities/User';
import path from 'path'
import uploadConfig from '@config/upload';
import fs from 'fs';
import AppError from '@shared/erros/AppError';
import IUsersRepository from './../repositories/iUsersRepository';
import { injectable, inject } from 'tsyringe'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';


interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) { }

    public async execute({user_id, avatarFilename}: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        if (user.avatar) {
            this.storageProvider.deleteFile(user.avatar);
        }

        const newFileName = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = avatarFilename;
        await this.usersRepository.save(user);

        return user;

    }

}

export default UpdateUserAvatarService;
