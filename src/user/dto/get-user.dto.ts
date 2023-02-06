import { UserModel } from '../user.model';

export type GetUserDto = Omit<UserModel, 'password'>;
