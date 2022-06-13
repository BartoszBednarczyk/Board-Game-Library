import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { GamesService } from '../games.service';
import { DataService } from '../services/data.service';

import { Tab3Page } from './tab3.page';

class GamesServiceMock {
  searchGames = () => {
    return of({ games: { name: 'test' } });
  };
}

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab3Page],
      providers: [
        { provide: DataService, useValue: {} },
        { provide: GamesService, useClass: GamesServiceMock },
        { provide: Router, useValue: { events: of({}) } },
        { provide: ActivatedRoute, useValue: {} },
      ],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
