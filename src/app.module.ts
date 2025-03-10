import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MeModule } from './me/me.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [AuthModule, MeModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
