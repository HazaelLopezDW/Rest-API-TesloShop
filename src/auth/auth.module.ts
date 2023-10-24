import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([ User ]), //? Cargamos nuestra tabla en la DB
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // JwtModule.register({ 
    //   secret: process.env.JWT_SECRECT,
    //   signOptions: {
    //     expiresIn: '23h'
    //   }
    //  })
  ],
  exports: [
    TypeOrmModule
  ]
})
export class AuthModule {}
