import { Module } from '@nestjs/common';
import { MarvelController } from './marvel.controller';
import { MarvelService } from './marvel.service';

@Module({ providers: [MarvelService], controllers: [MarvelController] })
export class MarvelModule {}
