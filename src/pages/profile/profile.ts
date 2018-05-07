import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  canEditPhone = false;
  canEditDescription = false;
  currentUser;
  constructor(public navCtrl: NavController, public user: User) {
    this.user.onReady((user)=>{
      this.currentUser=this.user._user;
    })
  }

  editPhone() {
    this.canEditPhone=true;
  }

  editDescription() {
    this.canEditDescription=true;
  }

  updatePhone(){
    this.canEditPhone=false;
    this.user.updatePhoneNumber(this.currentUser.phone);
  }

  updateDescription(){
    this.canEditDescription=false;
    this.user.updateProperty('description',this.currentUser.description);
  }
}
