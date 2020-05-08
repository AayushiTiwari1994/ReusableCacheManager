import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CacheManagerService } from './cache-manager.service';
import { HttpModule } from '@angular/http';
import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

@Injectable()
class MockCacheStorageService {
}

@Injectable()
class MockNetork { }

describe('CacheManagerService', () => {
  let fixture: ComponentFixture<CacheManagerService>;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpModule],
    providers: [CacheService, { provide: CacheStorageService, useClass: MockCacheStorageService },
      { provide: Network, useClass: MockNetork }
    ],
  }));

  it('should be created', () => {
    const service: CacheManagerService = TestBed.get(CacheManagerService);
    expect(service).toBeTruthy();
  });
});
