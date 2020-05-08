import { TestBed } from '@angular/core/testing';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { of } from 'rxjs';

import { NetworkReachabilityService } from './network-reachability.service';

describe('NetworkReachabilityService', () => {
  enum ConnectionStatus {
    Online = 'Online',
    Offline = 'Offline'
  }
  beforeEach(() => {TestBed.configureTestingModule({
    providers: [Network, Platform],
  });
});

  it('should be created', () => {
    const service: NetworkReachabilityService = TestBed.get(NetworkReachabilityService);
    expect(service).toBeTruthy();
  });
  it('should check device', () => {
    const platform = TestBed.get(Platform);
    const network = TestBed.get(Network);
    spyOn(platform, 'ready').and.callFake(() => Promise.resolve(''));

    const service: NetworkReachabilityService = TestBed.get(NetworkReachabilityService);
    spyOn(service, 'initializeNetworkEvents').and.callFake(() => { });
    spyOn(network, 'onConnect').and.callFake(() => of(ConnectionStatus.Online));
    spyOn(network, 'onDisconnect').and.callFake(() => of({}));
  })
});
