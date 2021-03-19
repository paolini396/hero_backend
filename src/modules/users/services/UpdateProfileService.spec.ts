import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gabriel Paolini',
      email: 'paolini@teste.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Paolini',
      email: 'paolini396@teste.com',
    });

    expect(updatedUser.name).toBe('Paolini');
    expect(updatedUser.email).toBe('paolini396@teste.com');
  });

  it('should not be able to update the profile from a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Gabriel Paolini',
      email: 'paolini@teste.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Gabriel Paolini',
        email: 'paolini@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gabriel Paolini',
      email: 'paolini@teste.com',
      password: '654321',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Paolini',
      email: 'paolini396@teste.com',
      old_password: '654321',
      password: '123456',
    });

    expect(updatedUser.password).toBe('123456');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gabriel Paolini',
      email: 'paolini@teste.com',
      password: '654321',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'paolini',
        email: 'paolini396@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gabriel Paolini',
      email: 'paolini@example.com',
      password: '654321',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Paolini',
        email: 'paolini396@teste.com',
        old_password: 'wrong-old-password',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
