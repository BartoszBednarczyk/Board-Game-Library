import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { GamesService } from 'src/app/games.service';
import { DataService } from 'src/app/services/data.service';

import { SearchedGameComponent } from './searched-game.component';

describe('SearchedGameComponent', () => {
  let component: SearchedGameComponent;
  let fixture: ComponentFixture<SearchedGameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchedGameComponent],
      providers: [
        { provide: GamesService, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
        { provide: DataService, useValue: {} },
        { provide: ActionSheetController, useValue: {} },
      ],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchedGameComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
