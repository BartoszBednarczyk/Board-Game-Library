import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'mylist';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _storage: Storage) {
    this.init();
  }

  init(): void {
    this._storage.create();
  }

  getData() {
    return this._storage.get(STORAGE_KEY) || [];
  }

  async addData(item) {
    const storedData = (await this._storage.get(STORAGE_KEY)) || [];
    storedData.push(item);
    return this._storage.set(STORAGE_KEY, storedData);
  }

  async removeData(index) {
    const storedData = (await this._storage.get(STORAGE_KEY)) || [];
    storedData.splice(index, 1);
    return this._storage.set(STORAGE_KEY, storedData);
  }
}
