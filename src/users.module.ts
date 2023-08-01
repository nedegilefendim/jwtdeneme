import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';
import { UserSeeder } from './user.seeder';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserSeeder],
  controllers: [UsersController],
})
export class UsersModule {}
