import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MarvelService } from './marvel.service';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@Controller('marvel')
export class MarvelController {
  constructor(private marvelService: MarvelService) {}

  @UseGuards(JwtAuthGuard)
  @Get('comics')
  async getComics(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    return this.marvelService.getComics(offset, limit);
  }
}
