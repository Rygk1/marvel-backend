import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class MarvelService {
  private readonly baseUrl = 'https://gateway.marvel.com/v1/public';

  private generateHash(ts: string): string {
    const MARVEL_PUBLIC_KEY = '95c2d4e6629b156c4c32489a89b03461';
    const MARVEL_PRIVATE_KEY = '1fc1d2a6f39f7237a3c28273ecde85b8ae1d19d1';

    return crypto
      .createHash('md5')
      .update(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY)
      .digest('hex');
  }

  async getComics(offset: number, limit: number) {
    const ts = new Date().getTime().toString();
    const hash = this.generateHash(ts);
    const MARVEL_PUBLIC_KEY = '95c2d4e6629b156c4c32489a89b03461';

    const apiKey = MARVEL_PUBLIC_KEY;
    try {
      const url = `${this.baseUrl}/comics?ts=${ts}&apikey=${apiKey}&hash=${hash}&offset=${offset}&limit=${limit}`;
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(`Error al obtener los cómics: ${error.message}`);
    }
  }
}
