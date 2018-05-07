import { LoadingController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  private messages: string[];
  loading: any;
  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService
  ) {
    let loginErrors = [
      'auth/user-disabled',
      'auth/invalid-email',
      'auth/user-not-found',
      'auth/wrong-password',
      'auth/network-request-failed'
    ];
    let defaultMessages = ['WAIT_PLEASE'];
    this.translateService
      .get(defaultMessages.concat(loginErrors))
      .subscribe(values => {
        this.messages = values;
      });
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: this.messages['WAIT_PLEASE']
    });
    this.loading.present();
  }
  dimissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
  showAlert(message, position?, duration?) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration || 3000,
      position: position || 'down'
    });
    toast.present();
  }
  showError(errorCode, onErrorUnkwonMessage, position?, duration?) {
    let toast = this.toastCtrl.create({
      message:
        this.messages[errorCode] || onErrorUnkwonMessage || 'Error Desconocido',
      duration: duration || 3000,
      position: position || 'top'
    });
    toast.present();
  }
}
