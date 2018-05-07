import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CustomizeCardPage } from './customize-card';

@NgModule({
  declarations: [
    CustomizeCardPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomizeCardPage),
    TranslateModule.forChild()
  ],
})
export class CustomizeCardPageModule {}
