import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  search: string = '';
  skip = 0;
  limit = 20;
  routerSub;
  componentInited = false;
  isFilterOpen = false;

  games = [];
  constructor(
    private _gamesService: GamesService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.routerSub = this._router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.componentInited) {
          this.findScannedGame();
        }
      }
    });
  }

  ngOnInit(): void {
    this.componentInited = true;
    this.findScannedGame();
    this.searchGames();
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
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

  findScannedGame(): void {
    const scannedGame = this._route.snapshot.paramMap.get('game');
    if (scannedGame) {
      this.search = scannedGame;
    }
  }
}
