import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ meta: any; data: User[] }> {
    const skip = (page - 1) * limit;
    const [users, total] = await this.usersRepository.findAndCount({
      skip: skip,
      take: limit,
    });

    const lastPage = Math.ceil(total / limit);

    return {
      meta: {
        page: {
          'current-page': page,
          'per-page': limit,
          from: skip + 1,
          to: Math.min(skip + limit, total),
          total,
          'last-page': lastPage,
        },
      },
      data: users,
    };
  }

  async findOne(id: number): Promise<User | null> {
    //const users = await this.usersRepository.find();
    return null;
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    //const user = await this.usersRepository.findOne(id);
    //if (!user) {
    return null;
    //}
    //Object.assign(user, userData);
    //return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return result.affected > 0;
  }
}
