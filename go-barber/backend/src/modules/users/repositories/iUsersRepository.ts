import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/iCreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {

    find(): Promise<User[]>;
    findById(id:string): Promise<User | undefined>;
    findByEmail(id:string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
    findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;

}
