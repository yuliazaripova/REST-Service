import { UserModel } from '../user.model';

export interface GetUserDto extends Omit<UserModel, 'password'> {}
