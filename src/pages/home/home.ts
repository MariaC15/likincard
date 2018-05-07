import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/providers';
import { UserAccountInterface } from '../../models/user-account-interface';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  currentUser: UserAccountInterface;
  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewCanEnter(){
    return new Promise((resolve,reject)=>{
      this.user.onReady((user)=>{
        this.currentUser=this.user._user;
        if(!this.currentUser){
          reject(null);
        }
       resolve(this.currentUser)
     });
    });
  }

}
