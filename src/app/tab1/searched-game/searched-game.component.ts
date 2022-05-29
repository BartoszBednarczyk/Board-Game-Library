import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/games.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-searched-game',
  templateUrl: './searched-game.component.html',
  styleUrls: ['./searched-game.component.scss'],
})
export class SearchedGameComponent implements OnInit, AfterViewInit {
  game: any;
  listData = [];
  constructor(
    private _gamesService: GamesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dataService: DataService
  ) {
    this.loadData();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    if (this._gamesService.activeGame) {
      this.game = this._gamesService.activeGame;
    } else {
      this._router.navigate(['../'], { relativeTo: this._route });
    }
  }

  ngAfterViewInit() {}

  openCategoryPage(url: string): void {
    window.location.href = url;
  }

  async loadData() {
    this.listData = await this._dataService.getData();
    console.log(this.listData);
  }

  async addData() {
    await this._dataService.addData(`Bartosz test`);
    this.loadData();
  }
}
