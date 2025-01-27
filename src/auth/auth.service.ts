import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async signup(dto: AuthDto){

        // Generate the password hash
        const hash = await argon.hash(dto.password);

        // Save the user to the database
        try{
            const user = await this.prismaService.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                },
            });

            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error('Email already exists');
            }

            throw new Error('Internal server error');
        }
    }

    async login(dto: AuthDto){
        // Find the user by email
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        // Check if the user exists
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Check if the password is correct
        const valid = await argon.verify(user.password, dto.password);

        if (!valid) {
            throw new Error('Invalid email or password');
        }

        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string,
      ): Promise<{ accessToken: string }> {
        const payload = {
          sub: userId,
          email,
        };
    
        const secret = this.configService.get('JWT_SECRET');
    
        const token = await this.jwtService.signAsync(payload, {
          expiresIn: '15m',
          secret: secret,
        });
    
        return {
          accessToken: token,
        };
      }

}
