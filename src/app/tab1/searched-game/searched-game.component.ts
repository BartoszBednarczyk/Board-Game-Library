import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
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
  inCollection: 'owned' | 'borrowed' | 'wishlist' | 'none' = 'none';
  constructor(
    private _gamesService: GamesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dataService: DataService,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this._gamesService.activeGame) {
      this.game = this._gamesService.activeGame;
      this.loadData();
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
    if (this.listData === null) {
      this.listData = [];
    }

    let game = this.listData.filter((game) => game.id === this.game.id);
    console.log(game);
    if (game.length) {
      this.inCollection = game[0].collection;
    } else {
      this.inCollection = 'none';
    }

    console.log(this.listData);
  }

  async addData(game) {
    await this._dataService.addData(game);
    this.loadData();
  }

  async deleteData(game) {
    await this._dataService.removeData(game);
    this.loadData();
  }

  async addToCollection() {
    if (this.inCollection === 'wishlist') {
      await this.deleteFromCollection();
      const game = {
        id: this.game.id,
        name: this.game.name,
        min_players: this.game.min_players,
        max_players: this.game.max_players,
        min_playtime: this.game.min_playtime,
        max_playtime: this.game.max_playtime,
        min_age: this.game.min_age,
        average_user_rating: this.game.average_user_rating,
        description_preview: this.game.description_preview,
        thumb_url: this.game.thumb_url,
        url: this.game.url,
        collection: 'owned',
      };
      await this.addData(game);
    } else {
      const game = {
        id: this.game.id,
        name: this.game.name,
        min_players: this.game.min_players,
        max_players: this.game.max_players,
        min_playtime: this.game.min_playtime,
        max_playtime: this.game.max_playtime,
        min_age: this.game.min_age,
        average_user_rating: this.game.average_user_rating,
        description_preview: this.game.description_preview,
        thumb_url: this.game.thumb_url,
        url: this.game.url,
        collection: 'owned',
      };
      await this.addData(game);
    }
  }

  async deleteFromCollection() {
    let index = this.listData.findIndex((game) => {
      game.id === this.game.id;
    });
    console.log(index);
    await this.deleteData(index);
  }

  async addToWishlist() {
    const game = {
      id: this.game.id,
      name: this.game.name,
      min_players: this.game.min_players,
      max_players: this.game.max_players,
      min_playtime: this.game.min_playtime,
      max_playtime: this.game.max_playtime,
      min_age: this.game.min_age,
      average_user_rating: this.game.average_user_rating,
      description_preview: this.game.description_preview,
      thumb_url: this.game.thumb_url,
      url: this.game.url,
      collection: 'wishlist',
    };
    await this.addData(game);
  }

  async borrowGame() {
    await this.deleteFromCollection();
    const game = {
      id: this.game.id,
      name: this.game.name,
      min_players: this.game.min_players,
      max_players: this.game.max_players,
      min_playtime: this.game.min_playtime,
      max_playtime: this.game.max_playtime,
      min_age: this.game.min_age,
      average_user_rating: this.game.average_user_rating,
      description_preview: this.game.description_preview,
      thumb_url: this.game.thumb_url,
      url: this.game.url,
      collection: 'borrowed',
    };
    await this.addData(game);
  }

  async unborrowGame() {
    await this.deleteFromCollection();
    const game = {
      id: this.game.id,
      name: this.game.name,
      min_players: this.game.min_players,
      max_players: this.game.max_players,
      min_playtime: this.game.min_playtime,
      max_playtime: this.game.max_playtime,
      min_age: this.game.min_age,
      average_user_rating: this.game.average_user_rating,
      description_preview: this.game.description_preview,
      thumb_url: this.game.thumb_url,
      url: this.game.url,
      collection: 'owned',
    };
    await this.addData(game);
  }

  async presentActionSheet() {
    const buttons = [
      {
        text: `${
          this.inCollection === 'owned' || this.inCollection === 'borrowed'
            ? 'Delete from collection'
            : 'Add to collection'
        }`,
        icon: `${
          this.inCollection === 'owned' || this.inCollection === 'borrowed'
            ? 'trash'
            : 'add'
        }`,
        handler: () => {
          if (
            this.inCollection === 'owned' ||
            this.inCollection === 'borrowed'
          ) {
            this.deleteFromCollection();
          } else {
            this.addToCollection();
          }
        },
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
    ];

    if (this.inCollection !== 'owned' && this.inCollection !== 'borrowed') {
      buttons.splice(1, 0, {
        text: `${
          this.inCollection === 'wishlist'
            ? 'Delete from wishlist'
            : 'Add to wishlist'
        }`,
        icon: 'star',
        handler: () => {
          if (this.inCollection === 'wishlist') {
            this.deleteFromCollection();
          } else {
            this.addToWishlist();
          }
        },
      });
    }
    if (this.inCollection === 'owned') {
      buttons.splice(1, 0, {
        text: `Borrow`,
        icon: 'people',
        handler: () => {
          this.borrowGame();
        },
      });
    }
    if (this.inCollection === 'borrowed') {
      buttons.splice(1, 0, {
        text: `Return`,
        icon: 'people',
        handler: () => {
          this.unborrowGame();
        },
      });
    }
    const actionSheet = await this.actionSheetController.create({
      header: this.game.name,
      cssClass: 'my-custom-class',
      buttons,
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
