import {
  EmailAlreadyRegisteredError,
  InvalidCredentialsError,
} from './errors/errors';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserRoles } from './roles/roles';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const emailExists = await this.prismaService.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (emailExists) {
      throw new EmailAlreadyRegisteredError();
    }

    const hashedPassword = bcrypt.hashSync(registerDto.password, 10);
    const newUser = await this.prismaService.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
        role: UserRoles.CUSTOMER,
      },
    });

    return newUser;
  }

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new InvalidCredentialsError();
    }

    const payload = {
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
