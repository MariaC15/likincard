import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { Account } from '../../models/account';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account : Account = { name: '', nickname:'',email: '', password: '' };

  // Our translated text strings
  private loginErrorString: string;
  private errorsMessages: string[];

  constructor(public navCtrl: NavController,
    public user: User,
    public alertCtrl : AlertController,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.translateService.get(["auth/user-disabled",
                          "auth/invalid-email",
                          "auth/user-not-found",
                          "auth/wrong-password"])
                    .subscribe(values => {
                                     this.errorsMessages = values;
                            });

  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).then((resp) => {
      this.navCtrl.push(MainPage);
    }).catch((err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  forgotPassword(){
    this.navCtrl.push('ForgotPasswordPage');
  }
}
