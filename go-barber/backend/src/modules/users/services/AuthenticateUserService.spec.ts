import AppError from '@shared/erros/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;


describe('AuthenticateUser', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUser = new AuthenticateUserService(
          fakeUsersRepository,
          fakeHashProvider,
        );
      });

  const email = 'jhon@doe.com';
  const password = '123123';

  it('should be able to authenticate', async () => {


    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email,
      password,
    });

    const response = await authenticateUser.execute({ email, password });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  it('should not be able to authenticate non existing user', async () => {

    expect(
      authenticateUser.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {

    await fakeUsersRepository.create({
      name: 'John Doe',
      email,
      password,
    });

    expect(
      authenticateUser.execute({
        email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
