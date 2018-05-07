import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { MyProfilePage } from './my-profile';

@NgModule({
  declarations: [
    MyProfilePage,
  ],
  imports: [
    TranslateModule.forChild(),
    IonicPageModule.forChild(MyProfilePage),
  ],
})
export class MyProfilePageModule {}
