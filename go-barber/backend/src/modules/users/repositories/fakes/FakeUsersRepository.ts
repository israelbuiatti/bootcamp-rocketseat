import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/iUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/iCreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async find(): Promise<User[]> {
        return this.users;
    }

    public async save(user: User): Promise<User> {
        const userIndex = this.users.findIndex(findUser => user.id === findUser.id);
        this.users[userIndex] = user;

        return this.users[userIndex];
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid() }, userData);

        this.users.push(user);
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);

        return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }

    public async findAllProviders({except_user_id,}: IFindAllProvidersDTO): Promise<User[]> {

        let { users } = this;

        if (except_user_id) {
            users = this.users.filter(user => user.id !== except_user_id);
        }

        return users;
    }

}

export default UsersRepository;
