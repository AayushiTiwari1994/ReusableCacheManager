import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Http } from '@angular/http';
import { CacheService } from 'ionic-cache';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs';
import { NetworkReachabilityService,ConnectionStatus } from './network-reachability.service';

// Reusable cache manager component

@Injectable({
  providedIn: 'root'
})
export class CacheManagerService {
  private datas: Observable<any>;
  private dataKey = "data-key";

  constructor(private http: Http,
    private cache: CacheService,
    private toastCtrl: ToastController,
    private networkSevice: NetworkReachabilityService) { }

  loadData(checkCondition, url?) {
    // fetching data from the url
    let req = this.http.get(url).pipe(map(
      response => {
        return response.json();
      }));

    let ttl = 10000;

    if (checkCondition == 1 || checkCondition == 2) {
      this.presentAlert();
      let delayType = 'all';
      this.datas = this.cache.loadFromDelayedObservable(url, req, this.dataKey, ttl, delayType);
    }
    else if (checkCondition == 3) {
      if (this.networkSevice.getCurrentNetworkStatus() == ConnectionStatus.Online) {
        this.datas = from(req);
        console.log("this.data====", this.datas);
        this.presentAlert()
      } else {
        console.log("ntwork status", this.networkSevice.getCurrentNetworkStatus());
        this.datas = from([]);
      }
    } else {
      let toast = this.toastCtrl.create({
        message: 'Fetching data from cache',
        duration: 2000,
        position: 'bottom'
      });
      toast.then(toast => toast.present());
      let delayType = 'none';
      this.datas = from(this.cache.loadFromDelayedObservable(url, req, this.dataKey, ttl * 2000, delayType));
    }
    return this.datas;
  }
  private async presentAlert() {
    let toast = await this.toastCtrl.create({
      message: 'New data from API loaded',
      duration: 2000
    })
    toast.present();
  }
}