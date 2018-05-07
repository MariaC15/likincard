import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-card-finishing',
  templateUrl: 'card-finishing.html',
})
export class CardFinishingPage {
  private selectOptions:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.selectOptions={
      title: 'Cargo más reciente',
    };
    console.log('ionViewDidLoad CardFinishingPage');
  }

}
