import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { GamesService } from '../games.service';

import { Tab1Page } from './tab1.page';

class GamesServiceMock {
  searchGames = () => {
    return of({ games: { name: 'test' } });
  };
}

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      providers: [
        { provide: GamesService, useClass: GamesServiceMock },
        { provide: Router, useValue: { events: of({}) } },
        { provide: ActivatedRoute, useValue: {} },
      ],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
  }));

  it('should createe', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component.routerSub, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.routerSub.unsubscribe).toHaveBeenCalled();
  });

  it('should call methods on init', () => {
    spyOn(component, 'findScannedGame');
    spyOn(component, 'searchGames');

    component.ngOnInit();

    expect(component.componentInited).toBeTrue();
    expect(component.findScannedGame).toHaveBeenCalled();
    expect(component.searchGames).toHaveBeenCalled();
  });

  it('#loadMoreGames should call service method', () => {
    spyOn(GamesService.prototype, 'searchGames');

    component.loadMoreGames({});

    expect(component.games).toBeTruthy();
  });
});
