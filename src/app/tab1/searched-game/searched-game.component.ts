import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/games.service';

@Component({
  selector: 'app-searched-game',
  templateUrl: './searched-game.component.html',
  styleUrls: ['./searched-game.component.scss'],
})
export class SearchedGameComponent implements OnInit, AfterViewInit {
  game: any;
  constructor(
    private _gamesService: GamesService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

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
}
