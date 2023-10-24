import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async register(createUserDto: CreateUserDto) {
    
    try {
      const user = this.userRepository.create( createUserDto );
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }


  private handleDBErrors(error: any): never {

    if(error.code) {
      throw new BadRequestException(`${error.detail}`)
    }

    console.log(error);

    throw new InternalServerErrorException(`Please Check server Logs`);
  }

}
