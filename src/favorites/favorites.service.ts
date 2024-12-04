import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private favoritesRepo: Repository<Favorite>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async addFavorite(
    userId: number,
    favoriteData: Partial<Favorite>,
  ): Promise<{ message: string; response: Favorite }> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }
    const favorite = this.favoritesRepo.create({
      ...favoriteData,
      user,
    });
    const response = await this.favoritesRepo.save(favorite);
    return {
      message: 'Agregado a Favorito de forma correcta',
      response,
    };
  }

  async getFavoritesByUser(userId: number): Promise<Favorite[]> {
    return this.favoritesRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async removeFavorite(favoriteId: number, userId: number): Promise<void> {
    const favorite = await this.favoritesRepo.findOne({
      where: { id: favoriteId, user: { id: userId } },
      relations: ['user'],
    });

    if (!favorite) {
      throw new Error('Favorite not found or does not belong to the user');
    }

    await this.favoritesRepo.remove(favorite);
  }
}
