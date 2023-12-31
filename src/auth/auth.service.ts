import { Injectable, NotFoundException, UnauthorizedException, BadRequestException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema';
import { AuthDto } from './dto/auth.dto';
import { HashService } from 'src/utils/hash/hash.service';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private hashService: HashService,
  ) {}

  async signUp(user: Partial<User>) {
    const result = await this.usersService.getUserByIdentifier(user.identifier);

    if (result) {
      throw new BadRequestException('User already exists');
    }

    user.password = await this.hashService.hashPassword(user.password);

    return await this.usersService.createUser(user);
  }

  async login(auth: AuthDto) {
    const user = await this.usersService.getUserByIdentifier(auth.identifier);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await this.hashService.comparePassword(
      auth.password,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.identifier, username: user.identifier };

    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN,
      expiresIn: '1d',
    });

    return {
      statusCode:HttpStatus.OK ,
      access_token: accessToken,
      user: {
        identifier: user.identifier,
        accept_terms_and_conditions: user.acceptTermsAndConditions,
        role: user.role,
      },
    };
  }
}
