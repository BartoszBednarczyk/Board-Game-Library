import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  activeGame: any;
  constructor(private _http: HttpClient) {}

  searchGames(name: string, skip: number, limit: number) {
    return this._http.get(
      `https://api.boardgameatlas.com/api/search?name=${name}&skip=${skip}&limit=${limit}&client_id=Kj3nCTPrS1`
    );
  }

  setActiveGame(game: any): void {
    this.activeGame = game;
  }
}
