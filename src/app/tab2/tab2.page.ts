import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  code: string = '';
  game: string = '';
  notfound: boolean = false;
  constructor(
    private barcodeScanner: BarcodeScanner,
    private _http: HttpClient,
    private _router: Router
  ) {}

  scan() {
    this.notfound = false;
    this.code = null;
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        console.log('Barcode data', barcodeData);
        this.code = barcodeData.text;
        this._http
          .get(`https://bgame-scrapper.herokuapp.com/find?code=${this.code}`)
          .subscribe((games: string[]) => {
            if (games) {
              this.game = games[0];
              this._router.navigate(['/tabs/tab1', { game: this.game }]);
            } else {
              this.notfound = true;
            }
          });
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }
}
