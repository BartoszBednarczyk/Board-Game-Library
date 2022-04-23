import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  search: string = '';
  skip = 0;
  limit = 20;

  isFilterOpen = false;

  games = [];
  constructor(private _gamesService: GamesService, private _router: Router) {}

  ngOnInit(): void {
    this.searchGames();
  }

  loadMoreGames(scroll): void {
    console.log('More');
    this._gamesService
      .searchGames(this.search, this.skip, this.limit)
      .subscribe((data: any) => {
        this.games.push(...data.games);
        this.skip += this.limit;
        scroll.target.complete();
      });
  }

  searchGames(): void {
    this.skip = 0;
    this._gamesService
      .searchGames(this.search, this.skip, this.limit)
      .subscribe((data: any) => {
        this.games = [];
        this.games.push(...data.games);
        this.skip += this.limit;
      });
  }

  setActiveGame(game: any): void {
    this._gamesService.setActiveGame(game);
    // this._router.navigateByUrl('/searchedGame');
  }
}
