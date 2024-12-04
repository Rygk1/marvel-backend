import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Favorite } from './favorite.entity';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('/:userId')
  async addFavorite(
    @Param('userId') userId: number,
    @Body() favoriteData: Partial<Favorite>,
  ) {
    return this.favoritesService.addFavorite(userId, favoriteData);
  }

  @Get('/:userId')
  async getFavoritesByUser(@Param('userId') userId: number) {
    return this.favoritesService.getFavoritesByUser(userId);
  }

  @Delete(':userId/:favoriteId')
  async removeFavorite(
    @Param('userId') userId: number,
    @Param('favoriteId') favoriteId: number,
  ) {
    await this.favoritesService.removeFavorite(favoriteId, userId);
    return { message: 'Favorite removed successfully' };
  }
}
