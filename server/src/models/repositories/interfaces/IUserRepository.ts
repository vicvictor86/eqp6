import { ICreateUserDTO } from '@models/dtos/ICreateUserDTO';
import { User } from '@models/User';

export interface IUsersRepository {
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsernameOrEmail(username: string, email: string): Promise<User | null>;
  all(): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
