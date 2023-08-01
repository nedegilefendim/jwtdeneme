import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async seed() {
    const existingUsers = await this.usersRepository.find();
    if (existingUsers.length === 0) {
      const usersData = [
        {
          first_name: 'Elif',
          last_name: 'Yilmaz',
          city: 'Kocaeli',
          phone: '5558559855',
          is_active: true,
        },
        {
          first_name: 'Meryem',
          last_name: 'Gunes',
          city: 'Konya',
          phone: '5554567474',
          is_active: false,
        },
      ];

      for (let i = 0; i < 500; i++) {
        const newUser = {
          first_name: `FirstName${i}`,
          last_name: `LastName${i}`,
          city: `City${i}`,
          phone: `555${Math.floor(Math.random() * 10000000)
            .toString()
            .padStart(7, '0')}`,
          is_active: Math.random() < 0.5,
        };
        usersData.push(newUser);
      }

      for (const userData of usersData) {
        const newUser = this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);
      }
    }
  }
}
