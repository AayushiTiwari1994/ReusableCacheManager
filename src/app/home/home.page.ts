import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { CacheManagerService } from '../cache-manager.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedValue: Number = 1;
  users = [];
  options = [{ "id": 1, "name": "cache first then online" },
  { "id": 2, "name": "online first then cache" },
  { "id": 3, "name": "only online" },
  { "id": 4, "name": "only cache" }
  ];

  private url = 'https://reqres.in/api/users?per_page=10&page=1';
  place: any;

  constructor(public navCtrl: NavController,
    private cacheService: CacheManagerService,
    private networkSerice: AppService,
    private toastCtrl: ToastController, ) { }

  fetchData(event) {
      this.cacheService.loadData(event.target.value, this.url).subscribe(data => {
      let records = data.data;
      if (records.length > 0) {
        this.users = records;
      } else {
        let toast = this.toastCtrl.create({
          message: 'No data Present ',
          duration: 3000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
      }
    }, error => {
      let toast = this.toastCtrl.create({
        message: 'No data Present ',
        duration: 3000,
        position: 'bottom'
      });
      toast.then(toast => toast.present());
    })
  }

}
