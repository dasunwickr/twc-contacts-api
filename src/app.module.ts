import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), AuthModule, PrismaModule, ContactModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
