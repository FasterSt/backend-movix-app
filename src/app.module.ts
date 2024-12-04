import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MeModule } from './me/me.module';

@Module({
  imports: [AuthModule, MeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
