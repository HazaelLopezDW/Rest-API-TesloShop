import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async createUser(createUserDto: CreateUserDto) {

    const { password, ...userData }  = createUserDto;
    
    try {
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(user);

      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({id: user.id})
      };

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto){

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: {email},
      select: { email: true, password: true, id: true } //! Ojo
    });

    if(!user) 
      throw new UnauthorizedException(`Credentials are not valid (email)`);

    if(!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(`Credentials are not valid (password)`);

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    //* Generar el Token
    const token = this.jwtService.sign(payload);
    return token;
  }


  private handleDBErrors(error: any): never {

    if(error.code) {
      throw new BadRequestException(`${error.detail}`)
    }

    console.log(error);

    throw new InternalServerErrorException(`Please Check server Logs`);
  }

}
