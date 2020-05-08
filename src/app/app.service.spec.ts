import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { of } from 'rxjs';

fdescribe('AppService', () => {
  enum ConnectionStatus {
    Online = 'Online',
    Offline = 'Offline'
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Network, Platform],
    });
  });

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();

  });

  it('should check device', () => {
    const platform = TestBed.get(Platform);
    const network = TestBed.get(Network);
    spyOn(platform, 'ready').and.callFake(() => Promise.resolve(''));

    const service: AppService = TestBed.get(AppService);
    spyOn(service, 'initializeNetworkEvents').and.callFake(() => { });
    spyOn(network, 'onConnect').and.callFake(() => of(ConnectionStatus.Online));
    spyOn(network, 'onDisconnect').and.callFake(() => of({}));

  })

});
