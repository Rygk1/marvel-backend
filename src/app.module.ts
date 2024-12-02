import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MarvelService } from './marvel/marvel.service';
import { FavoritesService } from './favorites/favorites.service';
import { MarvelController } from './marvel/marvel.controller';
import { MarvelModule } from './marvel/marvel.module';
import { ConfigModule } from '@nestjs/config';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesModule } from './favorites/favorites.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles en toda la aplicación
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Beforeiforget1729.',
      database: 'marvel',
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
