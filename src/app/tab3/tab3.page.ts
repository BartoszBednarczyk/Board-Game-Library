import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GamesService } from '../games.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit, OnDestroy {
  segment: 'owned' | 'borrowed' | 'wishlist' = 'owned';
  games = [];
  routerSub;
  constructor(
    private _dataService: DataService,
    private _gamesService: GamesService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.routerSub = this._router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes('tabs/tab3')) {
          this.loadData();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  segmentChanged($event) {
    this.loadData();
  }

  async loadData() {
    this.games = await this._dataService.getData();
    if (this.games === null) {
      this.games = [];
    } else {
      this.games = this.games.filter((game) => {
        return game.collection === this.segment;
      });
    }

    console.log(this.games);
  }

  setActiveGame(game: any): void {
    this._gamesService.setActiveGame(game);
    // this._router.navigateByUrl('/searchedGame');
  }
}
