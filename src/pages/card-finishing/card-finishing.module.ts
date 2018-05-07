import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CardFinishingPage } from './card-finishing';

@NgModule({
  declarations: [
    CardFinishingPage,
  ],
  imports: [
    IonicPageModule.forChild(CardFinishingPage),
    TranslateModule.forChild()
  ],
})
export class CardFinishingPageModule {}
