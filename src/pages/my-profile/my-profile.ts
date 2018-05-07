import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/providers';
import { UserAccountInterface } from '../../models/user-account-interface';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  canEditPhone = false;
  canEditDescription = false;
  currentUser: UserAccountInterface;
  constructor(public navCtrl: NavController, public user: User) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  getProfilePic(){
    if (!this.currentUser){
      return './assets/img/perfil_kevin.png';
    }
    return this.currentUser.profilePic||'./assets/img/perfil_kevin.png';
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
