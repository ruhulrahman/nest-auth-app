import { User } from '@models/user.entity';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> {}