import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';

import { User, LoadingService } from '../../providers/providers';
import { Account } from '../../models/account';
//import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';
import { MainPage } from '../pages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public optinSegment:string="personas"
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type

  form: FormGroup;
  isReadyToSave: boolean;
  loading: any;

  //@ViewChild('inputName') inputName:TextInput;

  account: Account = {
    name: 'Test Human',
    nickname: 'loki',
    email: 'test@example.com',
    password: 'test12'
  };

   // Our translated text strings
  private signupErrorString: string;
  private errorsMessages: string[];

  constructor(
    public navCtrl: NavController,
    public user: User,
    formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public loadingService: LoadingService,
    public translateService: TranslateService
  ) {
    this.translateService.get('SIGNUP_ERROR').subscribe(value => {
      this.signupErrorString = value;
    });

    this.translateService
      .get([
        'auth/email-already-in-use',
        'auth/invalid-email',
        'auth/operation-not-allowed',
        'auth/weak-password',
        'auth/too-many-requests',
        'auth/invalid-phone-number',
        'WAIT_PLEASE'
      ])
      .subscribe(values => {
        this.errorsMessages = values;
      });

    this.form = formBuilder.group({
      name: ['', Validators.required],
      //nickname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
  }

  doSignup() {
    this.loadingService.showLoading();
    this.account = this.form.value;
    //check if email exist
    this.user
      .isValidEmailForSignUp(this.account.email)
      .then(valid => {
        if (valid) {
          this.user.preSavedAccountInfo = this.account;
          this.user
            .signup(this.account)
            .then(() => {
              this.loadingService.dimissLoading();
              console.log('cuenta creada con exito');
              this.navCtrl.push(MainPage);
            })
            .catch(err => {
              this.loadingService.dimissLoading();
              this.loadingService.showError(
                err['code'],
                this.errorsMessages[err['code']] || this.signupErrorString
              );
            });
        } else {
          this.loadingService.dimissLoading();
          this.loadingService.showError(
            'auth/email-already-in-use',
            this.errorsMessages['auth/email-already-in-use']
          );
        }
      })
      .catch(err => {
        this.loadingService.dimissLoading();
        this.loadingService.showError(
          err['code'],
          this.errorsMessages[err['code']] || this.signupErrorString
        );
      });
  }

    
  }
