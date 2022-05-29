import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchedGameComponent } from '../tab1/searched-game/searched-game.component';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'searchedGame',
    component: SearchedGameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3PageRoutingModule {}
