import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: (req: Request) => {
				// Check if the token is present in the Authorization header
				const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

				// If token is not present in the Authorization header, check the "auth_token" cookie
				if (!token && req.cookies['auth_token']) {
					return req.cookies['auth_token'];
				}

				return token;
			},
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
		});
	}

	async validate(payload: any) {
		return { ...payload };
	}
}
