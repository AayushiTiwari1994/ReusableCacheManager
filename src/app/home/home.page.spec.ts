import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ToastController } from '@ionic/angular';

import { HomePage } from './home.page';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { CacheManagerService } from '../cache-manager.service';
import { RouterModule, UrlSerializer } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location, CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { NetworkReachabilityService } from '../network-reachability.service';

@Injectable()
class MockCacheManagerService {
  loadData() {
    return of({})
  }
}

@Injectable()
class MocNetworkReachabilityService{ }

@Injectable()
class MockLocation { }

@Injectable()
class MockUrlSerializer { }

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule.forRoot(), RouterModule,
        IonicModule, FormsModule, CommonModule],
      providers: [{ provide: CacheManagerService, useClass: MockCacheManagerService },
      { provide: NetworkReachabilityService, useClass: MocNetworkReachabilityService },
      { provide: Location, useClass: MockLocation },
      { provide: UrlSerializer, useClass: MockUrlSerializer }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fetch data', async () => {

    const cacheService = TestBed.get(CacheManagerService);
    let event = { target: { value: 3 } }
    let app = fixture.debugElement.componentInstance;
    app.url = 'sdhfhdsg'

    spyOn(cacheService, 'loadData').and.callFake(() =>
      of({
        data: [{}, {}, {}, {}, {}]
      })
    );
    app.fetchData(event);
    expect(app.fetchData).toBeTruthy();
    expect(cacheService.loadData).toHaveBeenCalled();
    expect(app.users.length).toEqual(5);
  });

  it('should show error', async () => {
    const toastCntrl = TestBed.get(ToastController)
    const cacheService = TestBed.get(CacheManagerService);
    let event = { target: { value: 3 } }
    let app = fixture.debugElement.componentInstance;
    app.url = 'sdhfhdsg'

    spyOn(cacheService, 'loadData').and.callFake(() =>
      of({
        data: []
      })
    );
    spyOn(toastCntrl, 'create').and.callFake(() => of({}).toPromise());
    app.fetchData(event);
    expect(app.fetchData).toBeTruthy();
    expect(cacheService.loadData).toHaveBeenCalled();
    expect(app.users.length).toEqual(0);
    expect(toastCntrl.create).toHaveBeenCalled();
  });
});
