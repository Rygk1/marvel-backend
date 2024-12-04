import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

import { Favorite } from './favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User]), UsersModule],
  providers: [FavoritesService],
  controllers: [FavoritesController],
  exports: [FavoritesService, TypeOrmModule],
})
export class FavoritesModule {
  constructor(private favoritesService: FavoritesService) {}
}
