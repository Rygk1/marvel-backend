import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MarvelModule } from './marvel/marvel.module';
import { ConfigModule } from '@nestjs/config';
import { FavoritesModule } from './favorites/favorites.module';
import { URLS } from './consts/consts';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: URLS.host,
      port: URLS.port,
      username: URLS.user,
      password: URLS.password,
      database: URLS.dbName,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    FavoritesModule,
    MarvelModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
